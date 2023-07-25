const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const router = express.Router();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from DALL.E"});
});

router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        const photo = response.data.data[0];

        res.status(200).json({ photo: photo});
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Something went wrong!"});
    }
});

export default router;