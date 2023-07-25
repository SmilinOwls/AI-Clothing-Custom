const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dalleRouter = require('./routes/dalle.routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', (req, res) => {
    res.status(200).json({ message: "Hello from DALL.E"});
});

app.use('/api/v1/dalle', dalleRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server has start on port ", process.env.PORT || 5000);
})