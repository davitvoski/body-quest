import dotenv from "dotenv"
import { Db, MongoClient } from "mongodb";
dotenv.config()

const dbUrl = process.env.ATLAS_URI as string
const dbName = process.env.DATABASE_NAME as string


let instance: Database;
class Database {
    client: MongoClient
    db: Db

    constructor() {
        if (!instance) {
            instance = this;
            this.client = new MongoClient(dbUrl)
            this.client.connect()
            this.db = this.client.db(dbName)
            console.log("Success62fully connected to MongoDB database");
        }
        return instance;
    }

}