import express, { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { IUser } from "../../shared";
import Database from "../database/db";
import dotenv from "dotenv";
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const db = new Database();

/**
 * Router controller
 * This function returns the user if it is in the session
 * @param req Express Request
 * @param res Express Response
 */
export function getUser(req: Request, res: Response) {
  try {
    if (req.session) return res.json({ user: req.session.user });
    res.json("No user in session");
  } catch (e) {
    res.status(500).json("No user in session");
  }
}

/**
 * Router controller
 * This function returns the specific user if it is in the database
 * @param req Express Request
 * @param res Express Response
 */
export async function getSpecificUser(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = await db.getUser(email);
    res.status(200).json({ user: user });
  } catch (e) {
    res.status(500).json("No user in db");
  }
}

/**
 * Router controller
 * This function authenticates the user when they login
 * @param req Express Request
 * @param res Express Response
 */
export async function authenticateUser(req: Request, res: Response) {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    if (!ticket) return res.sendStatus(401);

    const payLoad = ticket.getPayload();

    if (!payLoad || !payLoad.name || !payLoad.email || !payLoad.picture) {
      return res
        .status(400)
        .send(
          "Payload does not exist using the ticket. Wrong environment variable most likely."
        );
    }

    let user: IUser = {
      username: payLoad.name,
      email: payLoad.email,
      picture: payLoad.picture,
      goals: [],
      favourites: [""],
      isAdmin: false,
      experience: 0,
    };

    const isSignedUp = await db.userIsSignedUp(user.email);

    if (!isSignedUp) {
      await db.addUser(user);
      console.log("Added a user to the db");
    } else {
      user = await db.getUser(payLoad.email);
      console.log("User is already signed up");
    }

    req.session.regenerate(function (err) {
      if (err) {
        return res.sendStatus(500);
      }
      req.session.user = user;
      res.json({ user: user });
    });
  } catch (e) {
    res.status(500).send("Error authenticating user");
  }
}

/**
 * Router controller
 * This function returns 200 if the user is authenticated or else it returns 401
 * @param req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  next();
}

/**
 * Router controller
 * This function logs out the user if they are logged in
 * @param req Express Request
 * @param res Express Response
 */
export function logout(req: Request, res: Response) {
  req.session.destroy(function (err) {
    if (err) {
      return res.sendStatus(500);
    }
    res.clearCookie("id");
    res.sendStatus(200);
  });
}

/**
 * This function delete a user profile 
 * @param req Express Request
 */
export async function deleteUser(req: Request) {
  try {
    const user = req.body.user as IUser
    await db.deleteUser(user);
    console.log("delete user to the db");
  } catch (err) {
    console.log(err);
  }
}