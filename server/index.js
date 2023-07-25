import express from 'express';
import dotenv  from 'dotenv';
import cors from 'cors';
import dalleRouter from './routes/dalle.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/dalle', dalleRouter);

app.use('/', (req, res) => {
    res.status(200).json({ message: "Hello from DALL.E"});
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server has start on port ", process.env.PORT || 5000);
});