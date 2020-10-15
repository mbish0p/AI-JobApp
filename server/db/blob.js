const keys = require('../config/dev')
const { BlobServiceClient } = require("@azure/storage-blob");
const crypto = require('crypto')

const STORAGE_ACCOUNT_NAME = keys.AZURE_STORAGE_ACCOUNT_NAME
const ACCOUNT_ACCESS_KEY = keys.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
const SAS = keys.AZURE_SHARED_ACCESS_SIGNATURE
const containerName = 'container'


const uploadFile = async (file) => {
    const fileName = crypto.randomBytes(6).toString('hex') + "_" + file.originalname
    const blobServiceClient = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net${SAS}`);
    const containerClient = await blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = await containerClient.getBlockBlobClient(fileName)
    await blockBlobClient.upload(file.buffer, file.buffer.byteLength)

    return blockBlobClient.url
}


module.exports = {
    uploadFile
}
