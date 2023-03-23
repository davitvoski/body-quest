import express from "express";
import { isAuthenticated } from "../controllers/auth.controller";
import { createPost, getAllPosts } from "../controllers/post.controller";
const postRouter = express.Router()

/**
 * This function will get all the posts from the db
 * @swagger
 * /api/posts/:
 *  get:
 *   summary: Get posts
 *   description: Gets all the posts from the db 
 *   tags:
 *    - Post
 *   parameters:
 *    - in: query
 *      name: limit
 *      schema:
 *        type: object
 *        properties: IPost[]
 *   responses:
 *    200:
 *     description: returns IPosts[]
 *     content:
 *      application/json:
 *       schema:
 *        type: IPosts[]
 *    400:
 *     description: Something went wrong
 */
postRouter.get("/", getAllPosts)

/**
 * @swagger
 * /api/posts/:
 *  post:
 *   summary: Saves a post to the database.
 *   description: Saves a post to the database.
 *   tags:
 *    - Post
 *   requestBody:
 *    required: true
 *    content:
 *     application/json: 
 *      schema:
 *       type: object
 *       properties:
 *        caption,
 *        date,
 *        imageUrl,      
 *        user  
 *       example: {
 *        user: {
 *         username: Raphael Canciani,
 *         email: raphaelcanciani@gmail.com,
 *         picture: https://lh3.googleusercontent.com/a/AGNmyxZrovTZZNVb71vMBomQtt7LyDOtKOKbJyWsddkf=s96-c   
 *          },
 *        imageUrl: base64string,
 *        caption:  test caption,
 *        date:     Wednesday, March 16, 2023 at 11:28 am
 *       }
 *  responses:
 *   200:
 *    description: Successfully saved post
 *   400:
 *    description: Error adding a post, missing a field
 *   500:
 *    description: Error saving post - server error
 */
postRouter.post("/createPost", isAuthenticated, createPost)

export default postRouter