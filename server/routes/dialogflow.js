const express = require('express');
const router = express.Router();
const dialogflow = require('dialogflow')
const structJSON = require('./structjson')
const serviceAccount = require('../config/arnoldbot-crte-cc8074304beb.json')

const config = require('../config/dev')

const projectId = config.googleProjectID
const sesionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode

// Create a new session
const sessionClient = new dialogflow.SessionsClient({ credentials: serviceAccount });
const sessionPath = sessionClient.sessionPath(projectId, sesionId);

router.post('/textQuery', async (req, res) => {

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(result.intent.displayName);
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result)

})


router.post('/eventQuery', async (req, res) => {

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent',);
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result)

})

module.exports = router;
