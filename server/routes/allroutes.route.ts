import express from "express";
import { OAuth2Client } from 'google-auth-library'
import session from 'express-session';
import { User, Database } from "../database/db";
import dotenv from 'dotenv'
import exerciseRouter from "./exercise.routes";
dotenv.config()

declare module 'express-session' {
  export interface SessionData {
    user: User;
  }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const router = express.Router()
const db = new Database();

router.get("/getUser", (req, res) => {
  res.json({user: req.session.user});
})

router.post("/auth", async (req, res) => {
  //TODO: should validate that the token was sent first
  const {token} = req.body;    

  const ticket = await client.verifyIdToken({
      idToken: token.credential,
      audience: process.env.GOOGLE_CLIENT_ID
  });
  
  if (!ticket) 
    return res.sendStatus(401);
  
  const payLoad = ticket.getPayload();
  const user = {"Username" : payLoad ? payLoad.name : "", "Email":  payLoad ? payLoad.email : "", "Picture": payLoad ? payLoad.picture : ""};

  const isSignedUp = await db.userIsSignedUp(user.Email);
    
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

function isAuthenticated(req: express.Request, res: express.Response, next: any) {  
  if (!req.session.user){
    return res.sendStatus(401); 
  }
  next();
}

router.get("/logout", isAuthenticated, function (req, res, next) {  
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

router.get("/", (_: express.Request, res: express.Response) => {
    res.json({ message: "Hello World" })
})

router.use(exerciseRouter)

export { router as allRoutes }
