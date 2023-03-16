import { Request, Response } from "express";
import { BlobServiceClient } from "@azure/storage-blob";
import Database from "../database/db";
import { IPost } from "../../shared";

const containerName = "bodyquestcontainer";
const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN;
const storageAccountName = process.env.AZURE_STORAGE_RESOURCE_NAME;
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
const blobService = new BlobServiceClient(uploadUrl);
const containerClient = blobService.getContainerClient(containerName);

export async function getAllPosts(req: Request, res: Response) {
    try {
        const posts = await new Database().getAllPosts()
        res.json(posts)
    } catch (err) {
        res.status(400).json({ message: "Error getting all posts" })
    }
}

export async function createPost(req: Request, res: Response) {
    try {
        const imageURL = await addImageToAzure(req.body.imageUrl, req.body.caption);        
        const post:IPost = {
            user: {
                username: req.body.user.username,
                email: req.body.user.email,
                picture: req.body.user.picture,
            },
            imageUrl: imageURL,
            caption: req.body.caption,
            date: req.body.date
        }

        await new Database().addPost(post);

        res.json(200);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error adding a post" })
    }
}

async function addImageToAzure(file:string, caption:string){
    const secondhalf = file.split(":")[1];
    const mimetype = secondhalf.split(";")[0];
    var today = Date.now();

    const blobClient = containerClient.getBlockBlobClient(`${caption + today +".png"}`);
    const options = { blobHTTPHeaders: { blobContentType: mimetype } };

    const base64Image = file.split(';base64,').pop() as string;
    var buf = Buffer.from(base64Image, 'base64');

    await blobClient.uploadData(buf, options);
    let imageUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${caption + today + ".png"}`
    return imageUrl;
}