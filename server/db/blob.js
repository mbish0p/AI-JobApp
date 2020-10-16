const keys = require('../config/dev')
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const crypto = require('crypto')
const fetch = require('node-fetch');
const { fail } = require('assert');

const STORAGE_ACCOUNT_NAME = keys.AZURE_STORAGE_ACCOUNT_NAME
const ACCOUNT_ACCESS_KEY = keys.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
const SAS = keys.AZURE_SHARED_ACCESS_SIGNATURE
const containerName = 'container'


const uploadFile = async (file) => {

    console.log(file)
    const fileName = crypto.randomBytes(6).toString('hex') + "_" + file.originalname
    const blobServiceClient = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net${SAS}`);
    const containerClient = await blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = await containerClient.getBlockBlobClient(fileName)
    await blockBlobClient.upload(file.buffer, file.buffer.byteLength)

    return blockBlobClient.url
}

const deleteFile_v2 = async (url) => {
    try {
        const blobServiceClient = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net${SAS}`);
        const blobBatchClient = blobServiceClient.getBlobBatchClient()
        const storageSharedKeyCredential = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY)
        const response = blobBatchClient.deleteBlobs([url], storageSharedKeyCredential)

        return response

    } catch (error) {
        const responseMessage = {
            succes: fail,
            message: `Unsuccessful deleted blob`,
            error
        }
        return responseMessage
    }
}

const deleteFile = async (url) => {

    let _blobName = url.replace("https://jobappdocsstorage.blob.core.windows.net/container/", '')
    let _blobName2 = _blobName.replace("%", " ")
    const index = _blobName2.indexOf('_')
    const blobID = _blobName2.substring(0, index)

    try {
        const blobServiceClient = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net${SAS}`);
        const containerClient = await blobServiceClient.getContainerClient(containerName);
        let trueBlobName = undefined
        for await (const blob of containerClient.listBlobsFlat()) {
            if (blob.name.includes(blobID))
                trueBlobName = blob.name
        }
        const blobClient = containerClient.getBlobClient(trueBlobName)
        await blobClient.delete()

        const responseMessage = {
            success: true,
            blobID,
            message: `Successful deleted blob`
        }

        return responseMessage

    } catch (error) {
        const responseMessage = {
            succes: fail,
            message: `Unsuccessful deleted blob`,
            error
        }
        return responseMessage
    }
}


module.exports = {
    uploadFile,
    deleteFile,
    deleteFile_v2
}
