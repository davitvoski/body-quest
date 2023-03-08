import express from "express";
import { OAuth2Client } from 'google-auth-library'
import session from 'express-session';
import dotenv from 'dotenv'
import exerciseRouter from "./exercise.routes";
import goalRouter from "./goal.router";
import { IUser } from "../../shared";
import Database from "../database/db";
const allRouters = express.Router()
dotenv.config()

declare module 'express-session' {
  export interface SessionData {
    user: IUser;
  }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const db = new Database();

allRouters.get("/getUser", (req, res) => {
  res.json({user: req.session.user});
})

allRouters.post("/auth", async (req, res) => {
  //TODO: should validate that the token was sent first
  const {token} = req.body;    

  const ticket = await client.verifyIdToken({
      idToken: token.credential,
      audience: process.env.GOOGLE_CLIENT_ID
  });
  
  if (!ticket) 
    return res.sendStatus(401);
  
  const payLoad = ticket.getPayload();
  const user = {"username" : payLoad ? payLoad.name : "", "email":  payLoad ? payLoad.email : "", "avatar": payLoad ? payLoad.picture : "", "goals": undefined};

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
});

function isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {  
  if (!req.session.user){
    return res.sendStatus(401); 
  }
  next();
}

allRouters.get("/logout", isAuthenticated, function (req: express.Request, res: express.Response) {  
  req.session.destroy(function(err) {
    if (err) {
      return res.sendStatus(500); 
    }
    res.clearCookie('id');   
    res.sendStatus(200);
  });  
});

//example of a protected route
//route for authenticated users only
allRouters.get("/protected",
    isAuthenticated,
    function (res: express.Response) {
        //would actually be doing something
        res.sendStatus(200); 
    }
);

allRouters.get("/", (_: express.Request, res: express.Response) => {
    res.json({ message: "Hello World" })
})

allRouters.use("/exercises", exerciseRouter)
allRouters.use("/goals", goalRouter)

export { allRouters as allRoutes }
