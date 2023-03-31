import { Request, Response } from "express";
import { BlobServiceClient } from "@azure/storage-blob";
import Database from "../database/db";
import { IPost, IPostLikedUser } from "../../shared";

const containerName = "bodyquestcontainer";
const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN;
const storageAccountName = process.env.AZURE_STORAGE_RESOURCE_NAME;
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
const blobService = new BlobServiceClient(uploadUrl);
const containerClient = blobService.getContainerClient(containerName);

/**
 * Router controller
 * This function returns all the posts in the database of every user
 * @param _ Express Request
 * @param res Express Response
 */
export async function getAllPosts(_: Request, res: Response) {
    try {
        const posts = await new Database().getAllPosts()
        res.json(posts)
    } catch (err) {
        res.status(400).json({ message: "Error getting all posts" })
    }
}

/**
 * Router controller
 * This function creates a post to save to the database
 * @param req Express Request
 * @param res Express Response
 */
export async function createPost(req: Request, res: Response) {
    try {
        const imageURL = await addImageToAzure(req.body.imageUrl, req.body.caption);
        const post: IPost = {
            imageUrl: imageURL,
            caption: req.body.caption,
            date: req.body.date,
            likedUsers: []
        }

        await new Database().addPost(post, req.session.user?.email as string);

        res.json(200);
    } catch (err) {
        res.status(400).json({ message: "Error adding a post, missing a field" })
    }
}

/**
 * Router controller: This method likes/unlikes a post
 * @param req Express Request
 * @param res Express Response
 */
export async function toggleLikedPost(req: Request, res: Response) {
    try {
        const post: IPost = req.body.post;
        const user: IPostLikedUser = req.body.user;
        const ownerEmail: string = req.body.ownerEmail

        let likedUsers: IPostLikedUser[] = post.likedUsers;
        const isPresent = likedUsers.some(someUser => someUser.email === user.email);

        let updatedPost = {}

        if (!isPresent) {
            likedUsers.push(user);
            updatedPost = await new Database().toggleLikedPost(post, likedUsers, ownerEmail);
        }
        else {
            let index = 0;
            likedUsers.forEach((someUser, i) => {
                if (someUser.email === user.email) {
                    index = i;
                }
            })
            likedUsers.splice(index);
            updatedPost = await new Database().toggleLikedPost(post, likedUsers, ownerEmail);
        }

        res.status(200).json({ post: updatedPost });
    } catch (error) {
        res.status(400).json({ message: "Error liking a post" })
    }
}

/**
 * Router controller
 * This function saves the image to the azure blob storage using the caption and current time,
 * this is done so that no other file will have the same name
 * @param file base64 string
 * @param caption string
 */
async function addImageToAzure(file: string, caption: string) {
    const secondhalf = file.split(":")[1];
    const mimetype = secondhalf.split(";")[0];
    const today = Date.now();

    const blobClient = containerClient.getBlockBlobClient(`${caption + today + ".png"}`);
    const options = { blobHTTPHeaders: { blobContentType: mimetype } };

    const base64Image = file.split(';base64,').pop() as string;
    const buf = Buffer.from(base64Image, 'base64');

    await blobClient.uploadData(buf, options);
    let imageUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${caption + today + ".png"}`
    return imageUrl;
}

/**
 * Router controller
 * This function deletes a post from the database
 * @param req Express Request
 * @param res Express Response
 */
export async function deletePost(req: Request, res: Response) {
    try {
        const postOwnerEmail = req.body.postOwnerEmail
        if (!postOwnerEmail) throw new Error("No post owner email provided")
        await new Database().removePost(req.body.post, postOwnerEmail);
        
        res.status(200).send("Post deleted")
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json(err.message);
        }
        res.status(500).send("Could Delete Post");
    }
}

/**
 * This function delete a post 
 * @param req Express Request
 */
export async function deleteAllPostByUser(req: Request) {
    try {
        await new Database().removeAllPosts(req.body.user);
    } catch (err) {
        console.log(err); 
    }
}