import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import weather from './routes/weather.js';
 
const PORT = process.env.PORT;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes

app.use('/api', weather);

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});