import express from "express";
import { isAuthenticated } from "../controllers/auth.controller";
import { updateUserInformationPATCH } from "../controllers/user.controller";

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

export default userRouter