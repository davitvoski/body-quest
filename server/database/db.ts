import dotenv from "dotenv";
import { Db, MongoClient, ObjectId } from "mongodb";
import { IExercise, IGoal, IPost, IUser } from "../../shared";
import { GetGoalsReturnValue } from "../types";
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
  postsCollection = "posts";

  constructor() {
    return instance;
  }

  /**
   * This function connects to the database
   * @returns The database instance
   */
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
   * This function checks to see if the user is signed up already in the db
   * @param email The email used to sign up
   * @returns true or false if signed in
   */
  async userIsSignedUp(email?: string) {
    const arrayOfUsers = await db.collection("users").find({ email: email }).toArray();
    if (arrayOfUsers.length >= 1) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * This function adds a user to the database
   * @param user The user to add to the database
   */
  public async addUser(user: IUser) {
    await db.collection("users").insertOne(user);
  }

  /**
   * This function gets all exercises from the database
   * @param limit The number of exercises to return
   * @returns  An array of exercises
   */
  async getAllExercises(limit: string): Promise<IExercise[]> {
    try {

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
      if (err instanceof Error) throw new Error(err.message)
      throw new Error("Error saving the goal")
    }
  }

  /**
   * This function gets all the goals for a user through the email from the database
   * @param email User email
   * @returns {IGoal[]}
   */
  async getUserGoals(email: string) {
    try {
      const collection = db.collection(this.usersCollection)

      await this.checkIfUserExists(email)

      const goals = await collection.findOne({ email: email }, { projection: { _id: 0, goals: 1 } }) as unknown as GetGoalsReturnValue

      return goals.goals

    } catch (err) {
      if (err instanceof Error) throw new Error(err.message)
      throw new Error("Error getting the goals")
    }
  }

  /**
   * This function gets all the posts from the db to show to any user
   * @returns {IPost[]}
   */
  async getAllPosts(){
    try {
      const collection = db.collection(this.postsCollection)

      const posts = await collection
        .find({}, { projection: { _id: 0 } })
        .toArray() as unknown as IPost[];
            
      return posts;
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message)
      throw new Error("Error getting the feed")
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

  /**
   * This method updates a goal to completed for a user in the database
   * @param email Email of the user
   * @param goal Goal to mark completed
   */
  async updateGoalCompleted(email: string, goal: IGoal) {
    try {
      const collection = db.collection(this.usersCollection)
      if (!goal.id) throw new Error("Goal does not have an id")

      const doesExist = await collection.findOne({
        email: email,
        goals: {
          $elemMatch: {
            id: goal.id
          }
        }
      })

      // Check if the goal exists
      if (!doesExist) throw new Error("Goal does not exist")
      await collection.findOneAndUpdate({
        email: email,
        goals: {
          $elemMatch: {
            id: goal.id
          }
        }
      }, {
        $set: {
          "goals.$.completed": true
        }
      }
      )
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
      throw new Error("Error updating the goal")
    }
  }

  /**
   * This method saves an exercises' name to the users favourites
   * @param email Email of the user
   * @param exerciseName Name of Exercise to favourite
   */
  async favouriteExercise(email: string, exerciseName: string) {
    try {
      const collection = db.collection(this.usersCollection)

      await this.checkIfUserExists(email)

      await collection.updateOne({ email: email }, { $addToSet: { favourites: exerciseName } })
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
      throw new Error("Error favouriting the exercise")
    }
  }

  /**
   * This function removes an exercise from the users favourites
   * @param email Email of the user
   * @param exerciseName Name of Exercise to remove from favourite
   */
  async unfavouriteExercise(email: string, exerciseName: string) {
    try {
      await this.checkIfUserExists(email)

      const collection = db.collection(this.usersCollection)

      await collection.updateOne({ email: email }, { $pull: { favourites: exerciseName } })

    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
      throw new Error("Error favouriting the exercise")
    }
  }

  /**
   * This function checks if an exercise is favourited by a user
   * @param email Email of the user
   * @param exerciseName Name of the exercise
   * @returns true if the exercise is favourited, false if not
   */
  async isExerciseFavourited(email: string, exerciseName: string) {
    try {
      const collectionUser = db.collection(this.usersCollection)
      await this.checkIfUserExists(email)

      const favouriteExercise = await collectionUser.find(
        {
          email: email,
          favourites: { $in: [exerciseName] }
        }
      ).toArray() as unknown as [string]

      return favouriteExercise.length > 0

    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
      throw new Error("Error checking if exercise is favourited")
    }

  }

  /**
   *  This function gets all the exercises that are favourited by a user
   * @param email Email of the user
   * @returns {IExercise[]}
   */
  async getFavouriteExercises(email: string) {
    try {
      const collectionUser = db.collection(this.usersCollection)
      const collectionExercise = db.collection(this.exercisesCollection)

      await this.checkIfUserExists(email)

      let favouriteExercise = await collectionUser.find(
        {
          email: email
        }, { projection: { favourites: 1, _id: 0 } }
      ).toArray()

      // Assign the favourites to a variable since the array is nested
      favouriteExercise = favouriteExercise[0].favourites

      const results = (await collectionExercise
        .find({ name: { $in: [...favouriteExercise] } }, { projection: { _id: 0 } })
        .toArray()) as unknown as IExercise[]

      return results
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
      throw new Error("Error get favourite exercises")
    }
  }
}