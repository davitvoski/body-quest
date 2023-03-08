import dotenv from 'dotenv'
import app from "../app"
import Database from '../database/db'
dotenv.config()

const PORT = process.env['PORT'] || 3001

app.listen(PORT, async () => {
    await new Database().connect()
    console.log(`Server listening on port ${PORT}!`)
})