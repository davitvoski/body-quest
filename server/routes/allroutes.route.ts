import express from "express";
import { OAuth2Client } from 'google-auth-library'
import session from "express-session";
import dotenv from 'dotenv'
dotenv.config()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const router = express.Router()

router.use("/", (_: express.Request, res: express.Response) => {
    res.json({ message: "Hello World" })
})

router.post("/auth", async (req, res) => {
    //TODO: should validate that the token was sent first
    const {token} = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
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
      req.session. = user;
      res.json({user: user});
    });
   });

export { router as allRoutes }