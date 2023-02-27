import dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";
import { IExercise } from "../../shared";

dotenv.config();

/**
 * This interface is used to send information to the front end and add with the routes
 */
interface User{
    Username?: string;
    Email?: string;
    Picture?: string;
}

const dbUrl = process.env.ATLAS_URI as string;
const dbName = process.env.DATABASE_NAME as string;

let instance: Database;
/**
 * This class is a singleton that connects to the MongoDB database
 */
export default class Database {
  client: MongoClient;
  db: Db;
  exercisesCollection: string = "exercises";

  constructor() {
    if (!instance) {
      instance = this;
      this.client = new MongoClient(dbUrl);
      this.client.connect();
      this.db = this.client.db(dbName);
      console.log("Successfully connected to MongoDB database");
    }
    return instance;
  }

  /**
   * This function checks to see if the user is signed up already in the db
   * @param email The email used to sign up
   * @returns true or false if signed in
   */
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

  /**
   * This function gets all exercises from the database
   * @param limit The number of exercises to return
   * @returns  An array of exercises
   */
  async getAllExercises(limit: string): Promise<IExercise[]> {
    try {
      console.log("limit is", limit);
      const collection = this.db.collection(this.exercisesCollection);
      const results = (await collection
        .find({}, { projection: { _id: 0 } })
        .toArray()) as unknown as IExercise[];
      // Get max number of exercises if limit is not specified
      if (!limit || limit === "0") limit = results.length.toString();

      const exercises = results.slice(0, parseInt(limit));
      return exercises;
    } catch (err) {
      throw new Error("Error getting all exercises");
    }
  }
}

export {
  Database,
  User
}
