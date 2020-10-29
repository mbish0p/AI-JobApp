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

    const fileName = crypto.randomBytes(6).toString('hex') + "_" + file.originalname
    const blobServiceClient = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net${SAS}`);
    const containerClient = await blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = await containerClient.getBlockBlobClient(fileName)
    await blockBlobClient.upload(file.buffer, file.buffer.byteLength)

    return blockBlobClient.url
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

async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
    });
}


const downloadFile = async (url) => {
    console.log('trakasdasdasdasdas', url)
    let _blobName = url.replace("https://jobappdocsstorage.blob.core.windows.net/container/", '')
    let _blobName2 = _blobName.replace("%", " ")
    const index = _blobName2.indexOf('_')
    const blobID = _blobName2.substring(0, index)

    try {
        const blobServiceClient = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net${SAS}`);
        const containerClient = await blobServiceClient.getContainerClient(containerName);
        let trueBlobName = undefined
        console.log('doopa')
        for await (const blob of containerClient.listBlobsFlat()) {
            if (blob.name.includes(blobID))
                trueBlobName = blob.name
        }
        const blobClient = containerClient.getBlobClient(trueBlobName)
        console.log('doopa')
        const downloadBlockBlobResponse = await blobClient.download();
        const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
        //console.log("Downloaded blob content:", downloaded.toString());

        return downloaded.toString()
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
    downloadFile
}
