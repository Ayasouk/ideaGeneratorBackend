const {OpenAI} = require('openai');

const openAIInstance = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


const createOpenAIIdeaGeneration = async (req, res) => {
    try{
        let openAIFinalResponse = "";
        const {targetAudience, interest} = req.body;

        const openAIPrompt = `Create 5 new micro SaaS ideas. Numbering the 1-5 based on the below information.
        For each idea include what the idea is.
        
        Target: ${targetAudience}. Interest Niche: ${interest}`;

        const openAIResponse = await openAIInstance.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: openAIPrompt}],
        });

        if(openAIResponse && openAIResponse.choices && openAIResponse.choices.length && openAIResponse.choices[0].message) {
            openAIFinalResponse = openAIResponse.choices[0].message.content;
        }
        openAIFinalResponse = openAIFinalResponse.split(/\r?\n|\r|\n/g);
        res.status(200).json({
            status: "success",
            data: {openAIFinalResponse},
        });
    } catch(error) {
        console.log(error);
    }
 }

 exports.createOpenAIIdeaGeneration = createOpenAIIdeaGeneration;