import { BlobServiceClient } from "@azure/storage-blob";
import { Request, Response } from "express";
import Database from "../database/db";
import { addProfilePictureToAzure } from "./azure";


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

        // Add image to blob storage
        const azureImageUrl = await addProfilePictureToAzure(newUserImage, newUsername, req.session.user?.picture as string)

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


export { addProfilePictureToAzure };

