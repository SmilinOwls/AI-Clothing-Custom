import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from DALL.E"});
});

router.post('/', async (req, res) => {
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    const openai = new OpenAIApi(config);

    try {
        const { prompt } = req.body;
        
        const response = await openai.createImage({
            prompt: prompt.trim(),
            n: 1,
            size: '256x256',
            response_format: 'b64_json'
        });

        const photo = response.data.data[0].b64_json;

        res.status(200).json({ photo: photo});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!"});
    }
});


export default router;