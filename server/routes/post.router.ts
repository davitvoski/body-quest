import express from "express";
import { isAuthenticated } from "../controllers/auth.controller";
import { createPost, getAllPosts } from "../controllers/post.controller";
const postRouter = express.Router()

postRouter.get("/", getAllPosts)

postRouter.post("/createPost", isAuthenticated, createPost)

export default postRouter