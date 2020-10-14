const keys = require('../config/dev')
const { BlobServiceClient, BlockBlobClient } = require("@azure/storage-blob");
const FileReader = require('filereader')

const STORAGE_ACCOUNT_NAME = keys.AZURE_STORAGE_ACCOUNT_NAME
const ACCOUNT_ACCESS_KEY = keys.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
const SAS = keys.AZURE_SHARED_ACCESS_SIGNATURE
const containerName = 'container'


const uploadFile = async (file) => {
    const blobServiceClient = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net${SAS}`);
    const containerClient = await blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = await containerClient.getBlockBlobClient(file.originalname)
    await blockBlobClient.upload(file.buffer, file.buffer.byteLength)

    return blockBlobClient.url
}


module.exports = {
    uploadFile
}
