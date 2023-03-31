import express from "express";
import { isAuthenticated } from "../controllers/auth.controller";
import {
  favouriteExerciseDELETE,
  favouriteExercisePOST,
  getAllExercises,
  getAllFavouriteExercises,
  getFavourtieExerciseByName,
  getSpecificUserFavouriteExercises,
} from "../controllers/exercise.controller";
const exerciseRouter = express.Router();

/**
 * This function gets all exercises from the database
 * It can be limited by a query parameter limit
 * @swagger
 * /api/exercises/:
 *  get:
 *      summary: Get all exercises
 *      description: Get all exercises
 *      tags:
 *          - Exercises
 *      parameters:
 *          - in: query
 *            name: limit
 *            schema:
 *              type: string
 *            description: The number of exercises to return
 *      responses:
 *          200:
 *              description: An array of exercises
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *          400:
 *              description: Error getting all exercises
 */
exerciseRouter.get("/", getAllExercises);

/**
 * This function gets all goals from the database of a user.
 * Email should be passed through the body
 * @swagger
 * /api/exercises/favourites:
 *  get:
 *   summary: Get all favourite exercises
 *   description: This endpoint gets all favourite exercises of a user by checking their favourites table
 *   tags:
 *    - Exercises
 *   responses:
 *    200:
 *     description: An array of favourite exercises
 *     content:
 *      application/json:
 *       schema:
 *        type: arrayS
 *        example:
 *         exercises: [{
             body_part: "waist",
             equipment: "body weight",
             gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
             name: "3/4 sit-up",
             target: "abs",
            }]
 *    401:
 *     description: Not authenticated
 *    400:
 *     description: Database error
 *    500:
 *     description: Server failed
 *          
 */
exerciseRouter.get("/favourites", isAuthenticated, getAllFavouriteExercises);

/**
 * This function retrieves all the favourite exercises of a user
 * @swagger
 * /api/exercises/favourites:
 * post:
 * summary: Get all favourite exercises of a specific user
 * description: This endpoint gets all favourite exercises of a specific user by checking their favourites table
 * tags:
 * - Exercises
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * description: The email of the user
 * responses:
 * 200:
 * description: An array of favourite exercises
 * content:
 * application/json:
 * schema:
 * type: array
 * example:
 * exercises: [{
 * body_part: "waist",
 * equipment: "body weight",
 * gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
 * name: "3/4 sit-up",
 * target: "abs",
 * }]
 * 401:
 * description: Not authenticated
 */
exerciseRouter.post("/favourites", getSpecificUserFavouriteExercises);

/**
 * This function gets all goals from the database of a user.
 * Email should be passed through the body
 * @swagger
 * /api/exercises/favourites/{name}:
 *  get:
 *   summary: Check if exercise is favourited
 *   description: This endpoint checks if an exercise is favourited by a user, If so it will return true via the response body.
 *   tags:
 *    - Exercises
 *   parameters:
 *      - in: path
 *        name: name
 *        required: true
 *        schema:
 *          type: string
 *        description: The name of the exercise
 *   responses:
 *    200:
 *     description: An array of goals
 *     content:
 *      application/json:
 *       schema:
 *        type: boolean
 *        example:
 *         isFavourite: true
 *    401:
 *     description: Not authenticated
 *    400:
 *     description: Database error
 *    500:
 *     description: Server failed
 *
 */
exerciseRouter.get(
  "/favourites/:name",
  isAuthenticated,
  getFavourtieExerciseByName
);

/**
 * This function adds the favourited exercise to the users favourites.
 * @swagger
 * /api/exercises/favourites:
 *  post:
 *   summary: Favourite an exercise
 *   description: This endpoint adds the favourited exercise to the users favourites.
 *   tags:
 *    - Exercises
 *   parameters:
 *    - in: body
 *      name: exerciseName
 *      required: true
 *      schema:
 *       type: object
 *       properties:
 *        exerciseName:
 *         type: string
 *         example: "3/4 sit-up"
 *   responses:
 *    200:
 *     description: Exercise favourited successfully
 *    401:
 *     description: Not authenticated
 *    400:
 *     description: Database error
 *    500:
 *     description: Server failed
 *
 */
exerciseRouter.post("/favourites", isAuthenticated, favouriteExercisePOST);

/**
 * This function adds the favourited exercise to the users favourites.
 * @swagger
 * /api/exercises/favourites/{name}:
 *  delete:
 *   summary: Unfavourite an exercise
 *   description: This endpoint removes the favourited exercise from the users favourites.
 *   tags:
 *    - Exercises
 *   parameters:
 *      - in: path
 *        name: name
 *        required: true
 *        schema:
 *          type: string
 *        description: The name of the exercise
 *   responses:
 *    200:
 *     description: Exercise unfavourited successfully
 *    401:
 *     description: Not authenticated
 *    400:
 *     description: Database error
 *    500:
 *     description: Server failed
 */
exerciseRouter.delete(
  "/favourites/:name",
  isAuthenticated,
  favouriteExerciseDELETE
);

export default exerciseRouter;
