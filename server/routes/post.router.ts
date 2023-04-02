import express from "express";
import { isAuthenticated } from "../controllers/auth.controller";
import { createPost, deletePost, getAllPosts, toggleLikedPost } from "../controllers/post.controller";
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
postRouter.post("/", isAuthenticated, createPost)

/**
 * @swagger
 * /api/posts/:
 *  delete:
 *   summary: Deletes a post from the database.
 *   description: Deletes a post from the database.
 *   tags:
 *    - Post
 *   requestBody:
 *    required: true
 *    content:
 *     application/json: 
 *      schema:
 *       type: object
 *       properties:
 *        _id
 *       example: {
 *        _id: 5f9a9f3f8a0df6d3e6b1c6a8
 *       }
 *  responses:
 *   200:
 *    description: Successfully deleted post
 *   400:
 *    description: Error deleting a post - database error/missing fields
 *   401:
 *    description: Not Authorized
 *   500:
 *    description: Error deleting post - server error
 */
postRouter.delete("/", isAuthenticated, deletePost)

// Generate a swagger comment
/**
 * @swagger
 * /api/posts/togglelikedPost:
 *  post:
 *   summary: Toggles a like on a post
 *   description: Toggles a like on a post
 *   tags:
 *    - Post
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        post,
 *        user,
 *        ownerEmail
 *       example: { post: { caption: "test caption", date: "date", imageUrl: "azure.png", likedUsers: []}, user: { username: "josh", email: "josh@gmail.com"}, postOwnerEmail: "Ricardo@gmail.com" }
 *   responses:
 *    200:
 *     description: Post liked/unliked
 *     content:
 *      application/json:
 *       schema:
 *         type: object
 *       properties:
 *        updatedPost
 *       example: 
 *        updatedPost: { post: old values, likedUsers: [user1]}
 *    401:
 *     description:  Not Authorized
 *    400:
 *     description: Something went wrong 
 */
postRouter.post("/togglelikedPost", isAuthenticated, toggleLikedPost)

export default postRouter