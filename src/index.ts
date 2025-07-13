import express from 'express';
import 'dotenv/config';

import weather from './routes/weather.js';
 
const PORT = process.env.PORT;

const app = express();

// middleware

app.use(express.json());

// routes

app.use('/api', weather);

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});