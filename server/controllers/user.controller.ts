import { BlobServiceClient } from "@azure/storage-blob";
import { Request, Response } from "express";
import Database from "../database/db";
import { addProfilePictureToAzure } from "./azure";

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
        // Check for changes
        if (newUsername === req.session.user?.username &&
            newUserImage === req.session.user?.picture) {
            return res.status(204).send("No changes.")
        }

        let azureImageUrl: string = req.session.user?.picture as string;
        // Add image to blob storage
        if (newUserImage !== req.session.user?.picture) {
            azureImageUrl = await addProfilePictureToAzure(newUserImage, newUsername, req.session.user?.picture as string)

        }

        // Change user in database.
        await new Database().updateUserInformation(newUsername, azureImageUrl, req.session.user?.email as string)
        const updatedUser = await new Database().getUser(req.session.user?.email as string)
        req.session.user = updatedUser
        res.status(200).json({ user: req.session.user })
    } catch (e) {
        if (e instanceof Error) {
            return res.status(400).send(e.message);
        }
        res.status(500).send("Could not update user information.");
    }
}


/**
 * Patch method for updating experience
 *  @param req Express Request
 * @param res Express Response
 */
export async function updateUserExperiencePATCH(req: Request, res: Response) {
    try {
        const newExperience = req.body.experience

        if (newExperience === req.session.user?.experience) {
            return res.status(204).send("No changes.")
        }

        // Change user in database.
        await new Database().updateUserExperience(newExperience, req.session.user?.email as string)
        const updatedUser = await new Database().getUser(req.session.user?.email as string)
        req.session.user = updatedUser

        res.status(200).json({ user: req.session.user })
    } catch (e) {
        if (e instanceof Error) {
            return res.status(400).send(e.message);
        }
        res.status(500).send("Could not update experience.");
    }
}
