import dotenv from "dotenv";
import { Collection, Db, MongoClient } from "mongodb";
import { IExercise, IGoal } from "../../shared";

dotenv.config();

const dbUrl = process.env.ATLAS_URI as string;
const dbName = process.env.DATABASE_NAME as string;

let instance: Database;
let client: MongoClient;
let db: Db;
/**
 * This class is a singleton that connects to the MongoDB database
 */
export default class Database {
  exercisesCollection = "exercises";
  usersCollection = "users";

  constructor() {
    return instance;
  }

  async connect() {
    if (!instance) {
      instance = this;
      client = new MongoClient(dbUrl);
      await client.connect();
      db = client.db(dbName);
      console.log("Successfully connected to MongoDB database");
    }
    return instance
  }

  /**
   * This function gets all exercises from the database
   * @param limit The number of exercises to return
   * @returns  An array of exercises
   */
  async getAllExercises(limit: string): Promise<IExercise[]> {
    try {
      console.log(db);

      const collection = db.collection(this.exercisesCollection);

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

  /**
   * This function saves a goal to the database for a user through the email
   * @param email The email of the user
   * @param goal The goal to save
   */
  async saveUserGoal(email: string, goal: IGoal) {
    try {
      const collection = db.collection(this.usersCollection)

      await this.checkIfUserExists(email)

      await collection.updateOne({ email: email }, { $push: { goals: goal } })
      return goal
    } catch (err) {
      console.log(err)
      if (err instanceof Error) throw new Error(err.message)
      throw new Error("Error saving the goal")
    }
  }

  /**
   * This function checks if a user exists in the database
   * @param email email of the user
   * @param collection 
   */
  private async checkIfUserExists(email: string) {
    const collection = db.collection(this.usersCollection)

    if (!await collection.findOne({
      email: {
        $exists: true, $in: [email]
      }
    })) {
      throw new Error("User does not exist")
    }
  }


}
