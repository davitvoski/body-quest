import { BlobServiceClient } from "@azure/storage-blob";
import { Request, Response } from "express";
import Database from "../database/db";

// Defining blob storage variables
const containerName = "bodyquestprofilepictures";
const sasToken = process.env.AZURE_STORAGE_USER_PROFILE_SAS_TOKEN;
const storageAccountName = process.env.AZURE_STORAGE_RESOURCE_NAME;
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
const blobService = new BlobServiceClient(uploadUrl);
const containerClient = blobService.getContainerClient(containerName);


/**
 * Patch method for updating user information
 * @param req Express Request
 * @param res Express Response
 */
export async function updateUserInformationPATCH(req: Request, res: Response) {
    try {
        const newUserImage = req.body.avatar as string
        const newUsername = req.body.username as string
        console.log("new user", newUsername)
        console.log("new image", newUserImage.slice(0, 20))
        // Check for changes
        if (newUsername === req.session.user?.username &&
            newUserImage === req.session.user?.picture) {
            return res.status(204).send("No changes.")
        }

        // Add image to blob storage
        const azureImageUrl = await addProfilePictureToAzure(newUserImage, newUsername, req.session.user?.picture as string)

        // Change user in database.
        await new Database().updateUserInformation(newUsername, azureImageUrl, req.session.user?.email as string)
        const updatedUser = await new Database().getUser(req.session.user?.email as string)
        req.session.user = updatedUser
        console.log(req.session.user)
        console.log(updatedUser)
        res.status(200).json({ user: req.session.user })
    } catch (e) {
        if (e instanceof Error) {
            return res.status(400).send(e.message);
        }
        res.status(500).send("Could not update user information.");
    }
}



/**
 * This function adds an image to azure blob storage
 * @param file File to upload to azure
 * @param username New username of user
 * @returns {Promise<string>} Url of image in azure
 */
async function addProfilePictureToAzure(file: string, username: string, oldBlob: string): Promise<string> {
    (async () => {
        try {
            const blobClient = containerClient.getBlockBlobClient(oldBlob);
            blobClient.deleteIfExists()
        } catch (e) {
            // Would log this in a log or something
            console.log("Failed to delete old blob")
        }
    })()

    try {
        const secondhalf = file.split(":")[1];
        const mimetype = secondhalf.split(";")[0];

        const fileName = `${username}profile.png`.toLocaleLowerCase()

        const blobClient = containerClient.getBlockBlobClient(fileName);
        const options = { blobHTTPHeaders: { blobContentType: mimetype } };

        const base64Image = file.split(';base64,').pop() as string;
        var buf = Buffer.from(base64Image, 'base64');

        await blobClient.uploadData(buf, options);
        let imageUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName}`
        return imageUrl
    } catch (e) {
        throw new Error("Could not upload image to azure")
    }
}