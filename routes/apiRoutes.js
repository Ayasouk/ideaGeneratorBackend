const express = require('express');

const router = express.Router()

const {createOpenAIIdeaGeneration} = require('../controllers/openAIController');

router.route("/createIdeaGeneration").post(createOpenAIIdeaGeneration);

module.exports = router;