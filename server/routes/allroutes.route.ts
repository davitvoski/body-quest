import express from "express";
import { OAuth2Client } from 'google-auth-library'
import session from "express-session";
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

import dotenv from 'dotenv'
dotenv.config()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const router = express.Router()

function isAuthenticated(req: express.Request, res: express.Response, next: any) {
  if (!req.session.user){
    return res.sendStatus(401); //unauthorized
  }
  next();
}

router.post("/auth", async (req, res) => {
    //TODO: should validate that the token was sent first
    const {token} = req.body;    

    const ticket = await client.verifyIdToken({
        idToken: token.credential,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    
    if (!ticket) 
      return res.sendStatus(401); //unauthorized (token invalid)
    
    const payLoad = ticket.getPayload();
    
    // TODO: you may want to upsert (update or insert if new) the user's name, email and picture in the database - step 4
    // do database stuff here 
    const user = {"name" : payLoad?.name, "email":  payLoad?.email, "picture": payLoad?.picture};


    //TODO: create a session cookie send it back to the client - step 5
    req.session.regenerate(function(err) {
      if (err) {
        return res.sendStatus(500); //server error, couldn't create the session
      }
      //store the user's info in the session
      req.session.user = user;
      res.json({user: user});
    });
});

router.get("/logout", isAuthenticated, function (req, res, next) {
  //destroy the session
  req.session.destroy(function(err) {
    //callback invoked after destroy returns
    if (err) {
      return res.sendStatus(500); //server error, couldn't destroy the session
    }
    res.clearCookie('id'); //clear the cookie
    res.sendStatus(200);
  });  
});

//example of a protected route
//route for authenticated users only
router.get("/protected",
    isAuthenticated,
    function (req, res) {
        //would actually be doing something
        res.sendStatus(200); 
    }
);

export { router as allRoutes }