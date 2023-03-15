import { Request, Response } from "express";
import { BlobServiceClient } from "@azure/storage-blob";
import Database from "../database/db";

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
        console.log(req.body);
        
        const file = req.body.imageUrl;

        const secondhalf = file.split(":")[1];
        const mimetype = secondhalf.split(";")[0];
    
        const blobClient = containerClient.getBlockBlobClient(req.body.caption + ".png");
        const options = { blobHTTPHeaders: { blobContentType: mimetype } };
    
        const base64Image = file.split(';base64,').pop();
        var buf = Buffer.from(base64Image, 'base64');
    
        await blobClient.uploadData(buf, options);
        let imageUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${req.body.caption} + ".png"}`
    
        console.log(imageUrl);
        
        console.log(req.body);
        res.json(200);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error adding a post" })
    }
}

async function addImageToAzure(){

}