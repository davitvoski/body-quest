import dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import allRoutes from './routes/allroutes.route'
import Database from './database/db'
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

// Create database connection
const db = new Database()
// Configure Express
const app = express()

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

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