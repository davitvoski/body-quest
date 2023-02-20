import dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { allRoutes } from './routes/allroutes.route'
import session from 'express-session'
dotenv.config()


const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "BodyQuest - API Documentation",
        version: "1.0.0",
        description: "This is the documentation for the BodyQuest Server for developers.",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development server"
        },
        {
            url: "TBD",
            description: "Production server"
        }
    ]
}

const options: swaggerJSDoc.Options = {
    swaggerDefinition,
    apis: ['./routes/*.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const app = express()

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(session({
    secret: process.env.SECRET ?? "", //used to sign the session id
    name: 'id', //name of the session id cookie
    saveUninitialized: false, //don't create session until something stored
    resave: false,
    cookie: { 
      maxAge: 3600000, //time in ms
      //should only sent over https, but set to false for testing and dev on localhost
      secure: true, 
      httpOnly: true, //can't be accessed via JS
      sameSite: 'strict' //only sent for requests to same origin
    }
  }));

app.use(express.json())

app.use(compression())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(express.static("../client/build"))

// Authentication route
app.use("/api", allRoutes)


// Default 404
app.use((_: express.Request, res: express.Response) => {
    res.sendStatus(404)
})

export default app