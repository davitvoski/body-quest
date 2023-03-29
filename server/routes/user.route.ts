import { BlobServiceClient } from "@azure/storage-blob";
import express, { Request, Response } from "express";
import { isAuthenticated } from "../controllers/auth.controller";
import Database from "../database/db";

const userRouter = express.Router()

const containerName = "bodyquestprofilepictures";
const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN;
const storageAccountName = process.env.AZURE_STORAGE_RESOURCE_NAME;
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
const blobService = new BlobServiceClient(uploadUrl);
const containerClient = blobService.getContainerClient(containerName);



userRouter.patch("/", isAuthenticated, async (req: Request, res: Response) => {
    console.log("body patch /users", req.body)
    console.log("session user", req.session.user)
    console.log(req.body.username === req.session.user?.username)
    console.log(req.session.user?.picture.localeCompare(req.body.avatar))

    console.log(req.body.avatar === req.session.user?.picture)

    const newUserImage = req.body.avatar
    const newUsername = req.body.username
    // Check for changes
    if (newUsername === req.session.user?.username &&
        newUserImage === req.session.user?.picture) {
        return res.status(204).send("No changes.")
    }

    // Add image to blob storage
    const azureImageUrl = await addProfilePictureToAzure(newUserImage, newUsername)

    // Change user in database.
    new Database().updateUserInformation(newUsername, azureImageUrl, req.session.user?.email as string)
    const updatedUser = await new Database().getUser(req.session.user?.email as string)
    req.session.user = updatedUser
    res.sendStatus(200)


})

/**
/**
 * This function saves the image to the azure blob storage using the caption and current time,
 * this is done so that no other file will have the same name
 * @param file base64 string
 * @param caption string
 */
async function addProfilePictureToAzure(file: string, username: string) {
    const secondhalf = file.split(":")[1];
    const mimetype = secondhalf.split(";")[0];
    var today = Date.now();

    const fileName = `${username}profile${today}.png`
    const blobClient = containerClient.getBlockBlobClient(fileName.toLocaleLowerCase());
    const options = { blobHTTPHeaders: { blobContentType: mimetype } };

    const base64Image = file.split(';base64,').pop() as string;
    var buf = Buffer.from(base64Image, 'base64');

    await blobClient.uploadData(buf, options);
    let imageUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName.toLocaleLowerCase()}}`
    return imageUrl;
}

export default userRouter