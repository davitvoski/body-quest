import express, {Request, Response, NextFunction} from "express";
import { OAuth2Client } from 'google-auth-library'
import session from 'express-session';
import { IUser } from "../../shared";
import Database from "../database/db";
import dotenv from 'dotenv';
dotenv.config()

declare module 'express-session' {
    export interface SessionData {
      user: IUser;
    }
}
  
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const db = new Database();

/**
 * This function returns the user if it is in the session
 * @param req Express Request
 * @param res Express Response
 */
export function getUser(req: Request, res: Response) {
    res.json({user: req.session.user});
}

/**
 * This function authenticates the user when they login
 * @param req Express Request
 * @param res Express Response
 */
export async function authenticateUser(req: Request, res: Response) {
    //TODO: should validate that the token was sent first
    const {token} = req.body;    
  
    const ticket = await client.verifyIdToken({
        idToken: token.credential,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    
    if (!ticket) 
      return res.sendStatus(401);
    
    const payLoad = ticket.getPayload();

    if (!payLoad || !payLoad.name || !payLoad.email || !payLoad.picture) {
      return res.status(400).send("Payload does not exist using the ticket. Wrong environment variable most likely.");
    }
        
    const user:IUser = {username : payLoad.name, email : payLoad.email, picture : payLoad.picture, goals: []}

    const isSignedUp = await db.userIsSignedUp(user.email);
      
    if (!isSignedUp){
      await db.addUser(user);
      console.log("Added a user to the db");
    }
    else {
      console.log("User is already signed up");
    }
    
  
    req.session.regenerate(function(err) {
      if (err) {
        return res.sendStatus(500);
      }
      req.session.user = user;  
      res.json({user: user});
    });
}

/**
 * This function returns 200 if the user is authenticated or else it returns 401 
 * @param req Express Request
 * @param res Express Response
 * @param next Express NextFunction 
 */
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {  
    if (!req.session.user){
      return res.sendStatus(401); 
    }
    next();
}

/**
 * This function logs out the user if they are logged in
 * @param req Express Request
 * @param res Express Response
 */
export function logout(req: Request, res: Response){
    req.session.destroy(function(err) {
        if (err) {
        return res.sendStatus(500); 
        }
        res.clearCookie('id');   
        res.sendStatus(200);
    });  
}

/**
 * This function is a test function to see if the user is protected,
 * will be used for administration and guests
 * @param res Express Response
 */
export function protectedTest(res: Response){
    res.sendStatus(200); 
}