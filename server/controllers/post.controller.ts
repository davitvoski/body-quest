import { Request, Response } from "express";
import Database from "../database/db";

export async function getAllPosts(req: Request, res: Response) {
    try {
        const posts = await new Database().getAllPosts()
        res.json(posts)
    } catch (err) {
        res.status(400).json({ message: "Error getting all posts" })
    }
}