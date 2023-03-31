import express from "express";
import { isAuthenticated } from "../controllers/auth.controller";
import { updateUserExperiencePATCH, updateUserInformationPATCH } from "../controllers/user.controller";

const userRouter = express.Router()

/**
 * This function updates the goal completed to true.
 * @swagger
 * /api/users/:
 *  patch:
 *   summary: Updates a user information
 *   description: Updates a user information (requires authentication) only the username and picture can be updated
 *   tags:
 *    - User
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       example:
 *        body: {username: "new name", avatar: "base 64 image"}
 *   responses:
 *    204:
 *     description: No changes needed
 *    200:
 *     description: User updated
 *    400:
 *     description: Database error
 *    401:
 *     description: Not authenticated
 *    500:
 *     description: Server failed
 * 
*/
userRouter.patch("/", isAuthenticated, updateUserInformationPATCH)

// Generate swagger comment
/**
 * This function updates the goal completed to true.
 * @swagger
 * /api/users/experience:
 *  patch:
 *   summary: Updates a user experience
 *   description: Updates a user experience (requires authentication)
 *   tags:
 *    - User
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       example:
 *        body: {experience: 100}
 *   responses:
 *    204:
 *     description: No changes needed
 *    200:
 *     description: User updated
 *    400:
 *     description: Database error
 *    401:
 *     description: Not authenticated
 *    500:
 *     description: Server failed
*/
userRouter.patch("/experience", isAuthenticated, updateUserExperiencePATCH);

export default userRouter
