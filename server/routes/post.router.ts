import express from "express";
import { getAllPosts } from "../controllers/post.controller";
const postRouter = express.Router()

postRouter.get("/", getAllPosts)

export default postRouter