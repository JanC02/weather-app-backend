import express from 'express';
import { config } from "../config.js";

const RESULTS_MAX_COUNT = config.autocomplete.maxResults;
const RESPONSE_LANG = config.autocomplete.responseLanguage;

const router = express.Router();

router.get('/autocomplete', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ message: 'q query is required.' });
    }

    // Open-Meteo handles easily requests with diacritics
    const parsedQuery = (query as string).trim();

    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${parsedQuery}&count=${RESULTS_MAX_COUNT}&language=${RESPONSE_LANG}&format=json`);
        
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