import express from "express";
import {
  getUser,
  authenticateUser,
  isAuthenticated,
  logout,
  protectedTest,
  getSpecificUser,
} from "../controllers/auth.controller";
const authRouter = express.Router();

/**
 * This function will get the user from the session
 * @swagger
 * /api/authentication/:
 *  get:
 *      summary: Get user
 *      description: Gets the user
 *      tags:
 *          - authentication
 *      parameters:
 *          - in: query
 *            name: limit
 *            schema:
 *              type: string
 *            description: The number of exercises to return
 *      responses:
 *          200:
 *              description: returns IUser
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: IUser
 */
authRouter.get("/getUser", getUser);

/**
 * This function will get the user from the session
 * @swagger
 * /api/authentication/:
 * get:
 *     summary: Get specific user
 *    description: Gets the specific user
 *   tags:
 *      - authentication
 * responses:
 * 200:
 *     description: returns IUser
 *   content:
 *     application/json:
 *        schema:
 *           type: IUser
 */
authRouter.post("/getSpecificUser", getSpecificUser);

/**
 * This function will authenticate the user and let them use the app logged in
 * @swagger
 * /api/authentication/:
 *  post:
 *      summary: Authenticates user
 *      description: Authenticates the user
 *      tags:
 *          - authentication
 *      parameters:
 *          - in: query
 *            name: limit
 *            schema:
 *              type: string
 *            description: Authenticates the user
 *      responses:
 *          200:
 *              description: returns IUser
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: IUser
 *          500:
 *              description: 500 error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: error
 */
authRouter.post("/auth", authenticateUser);

/**
 * This function will make sure the user is authenticated and log them out
 * @swagger
 * /api/authentication/:
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

/**
 * This function will make sure the user is authenticated and returns 200
 * @swagger
 * /api/authentication/:
 *  post:
 *      summary: Checks if user is authenticated
 *      description: Will be used to see if the user is admin or guest etc
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
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: 200
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: error
 */
authRouter.get("/protected", isAuthenticated, protectedTest);

export default authRouter;
