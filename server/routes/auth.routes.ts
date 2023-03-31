import express from "express";
import {
  getUser,
  authenticateUser,
  isAuthenticated,
  logout,
  getSpecificUser,
} from "../controllers/auth.controller";
const authRouter = express.Router();

/**
 * This function will get the user from the session
 * @swagger
 * /api/authentication/getUser:
 *  get:
 *   summary: Get user
 *   description: Gets the user from the current session
 *   tags:
 *    - authentication
 *   responses:
 *    200:
 *     description: returns IUser
 */
authRouter.get("/getUser", getUser);

/**
 * This function will get the user from the session
 * @swagger
 * /api/authentication/:
 *  get:
 *   summary: Get specific user
 *   description: Gets the specific user
 *   tags:
 *     - authentication
 *   responses:
 *    200:
 *     description: returns IUser
 */
authRouter.post("/getSpecificUser", getSpecificUser);

/**
 * This function will authenticate the user and let them use the app logged in
 * @swagger
 * /api/authentication/auth:
 *  post:
 *   summary: Authenticates user
 *   description: Authenticates the user
 *   tags:
 *    - authentication
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        goal
 *       example:
 *        token: Google token
 *   responses:
 *    200:
 *     description: returns IUser
 *     content:
 *      application/json:
 *       schema:
 *         type: IUser
 *    400:
 *     description:  Token Payload does not exist
 *    500:
 *     description: Server Error
 */
authRouter.post("/auth", authenticateUser);

/**
 * This function will make sure the user is authenticated and log them out
 * @swagger
 * /api/authentication/logout:
 *  post:
 *      summary: Logs out user
 *      description: Makes sure the user is logged in and logs them out
 *      tags:
 *          - authentication
 *      parameters:
 *          - in: query
 *            name: limit
 *            schema:
 *              type: string
 *            description: Logs user out
 *      responses:
 *          200:
 *              description: returns 200
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: 200
 *          500:
 *              description: 500 error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: error
 */
authRouter.get("/logout", isAuthenticated, logout);

export default authRouter;
