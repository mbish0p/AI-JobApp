const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
//const sequalize = require('./server/db/sequelize');

// (async () => {
//     try {
//         await sequalize.sync({ force: true });
//         console.log("The table for the User model was just (re)created!");
//     } catch (error) {
//         console.log(error)
//     }
// })()


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/dialogflow', require('./server/routes/dialogflow'));
app.use('/users', require('./server/routes/user'))


const port = process.env.PORT || 5000;

const keys = require('./server/config/dev')
const { BlobServiceClient, BlockBlobClient } = require("@azure/storage-blob");

const STORAGE_ACCOUNT_NAME = keys.AZURE_STORAGE_ACCOUNT_NAME
const ACCOUNT_ACCESS_KEY = keys.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
const SAS = keys.AZURE_SHARED_ACCESS_SIGNATURE

const blobServiceClient = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net${SAS}`);

async function main() {
    const containerName = 'container'
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const name = 'testfile'
    const blockBlobClient = containerClient.getBlockBlobClient(name)
    const filePath = path.join(__dirname, '/server/files/test.txt')

    const result = blockBlobClient.uploadFile(filePath)

    console.log(result)
}

main()


app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
