import dotenv from 'dotenv'
import session from 'express-session'
import app from "../app"
import Database from '../database/db'
dotenv.config()

const PORT = process.env['PORT'] || 3001

app.listen(PORT, async () => {
    await new Database().connect()
    console.log(`Server listening on port ${PORT}!`)
})

if (process.env.NEED_GOOGLE as string === "true") {  
  app.use(session({
    secret: process.env.SECRET ?? "", //used to sign the session id
    name: 'id', //name of the session id cookie
    saveUninitialized: false, //don't create session until something stored
    resave: false,
    cookie: { 
      maxAge: 3600000, //time in ms
      //should only sent over https, but set to false for testing and dev on localhost
      secure: false, 
      httpOnly: true, //can't be accessed via JS
      sameSite: 'strict' //only sent for requests to same origin
    }
}));  
}

