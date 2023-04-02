import { BlobServiceClient } from "@azure/storage-blob";

// Defining blob storage variables
const containerName = "bodyquestprofilepictures";
const sasToken = process.env.AZURE_STORAGE_USER_PROFILE_SAS_TOKEN;
const storageAccountName = process.env.AZURE_STORAGE_RESOURCE_NAME;
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
const blobService = new BlobServiceClient(uploadUrl);
const containerClient = blobService.getContainerClient(containerName);

/**
 * This function adds an image to azure blob storage
 * @param file File to upload to azure
 * @param username New username of user
 * @returns {Promise<string>} Url of image in azure
 */
export async function addProfilePictureToAzure(file: string, username: string, oldBlob: string): Promise<string> {
    (async () => {
        try {
            const blobClient = containerClient.getBlockBlobClient(oldBlob);
            blobClient.deleteIfExists()
        } catch (e) {
            // Would log this in a log storage service
            // console.log("Failed to delete old blob")
        }
    })()

    try {
        const secondhalf = file.split(":")[1];
        const mimetype = secondhalf.split(";")[0];

        const fileName = `${username}${Date.now()}profile.png`.toLocaleLowerCase()

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