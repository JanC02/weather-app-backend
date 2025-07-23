import express from 'express';
import 'dotenv/config';
// import { removeDiacritics } from '../helpers/removeDiacritics.js';

const MAX_COUNT = 20;

const router = express.Router();

router.get('/autocomplete', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ message: 'q query is required.' });
    }

    // const parsedQuery = removeDiacritics(query as string);
    const parsedQuery = (query as string).trim();

    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${parsedQuery}&count=${MAX_COUNT}&language=en&format=json`);
        
        if(response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            res.status(response.status).json({ message: response.statusText });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

export default router;