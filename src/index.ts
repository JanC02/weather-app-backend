import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import current from './routes/current.js';
import autocomplete from './routes/autocomplete.js';
 
const PORT = process.env.PORT;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes

app.use('/api/weather', current);
app.use('/api/weather', autocomplete);

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});