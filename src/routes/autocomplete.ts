import express from 'express';
import { config } from '../config.js';
import { AutocompleteSchema } from '../types.js';
import NodeCache from 'node-cache';
import { removeDiacritics } from '../helpers/removeDiacritics.js';

const RESULTS_MAX_COUNT = config.autocomplete.maxResults;
const RESPONSE_LANG = config.autocomplete.responseLanguage;
const AUTOCOMPLETE_URL = config.autocomplete.geocodingUrl;

// 24h
const cache = new NodeCache({ stdTTL: 86400 });

if (!AUTOCOMPLETE_URL) {
    console.error('FATAL ERROR: AUTOCOMPLETE_URL is not defined.');
    process.exit(1);
}

const router = express.Router();

router.get('/autocomplete', async (req, res) => {
    const result = AutocompleteSchema.safeParse(req.query);

    if (!result.success) {
        return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const parsedQuery = result.data.q;

    const normalizedQuery = removeDiacritics(parsedQuery);
    const cacheKey = `autocomplete-${normalizedQuery}`;

    try {
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.status(200).json(cachedData);
        }

        const response = await fetch(`${AUTOCOMPLETE_URL}?name=${parsedQuery}&count=${RESULTS_MAX_COUNT}&language=${RESPONSE_LANG}&format=json`);

        if(response.ok) {
            const data = await response.json();
            cache.set(cacheKey, data);

            res.status(200).json(data);
        } else {
            res.status(response.status).json({ message: response.statusText });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

export default router;