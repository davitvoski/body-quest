import dotenv from "dotenv"
import { Db, MongoClient } from "mongodb";
dotenv.config()

const dbUrl = process.env.ATLAS_URI as string
const dbName = process.env.DATABASE_NAME as string

interface User{
    Username?: string;
    Email?: string;
    Picture?: string;
}

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
            console.log("Successfully connected to MongoDB database");
        }
        return instance;
    }

    async userIsSignedUp(email?: string) {
        const arrayOfUsers = await this.db.collection("users").find({Email: email}).toArray();
        let isUserSignedUp;        
        if (arrayOfUsers.length >= 1){
            isUserSignedUp = true;
        }
        else {
            isUserSignedUp = false;
        }        
        return isUserSignedUp;
    }

    public async addUser(user: User) {
        await this.db.collection("users").insertOne(user);
    }
}

export {
    Database,
    User
}
