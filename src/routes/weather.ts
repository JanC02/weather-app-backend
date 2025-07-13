import express from 'express';
import 'dotenv/config';

import { removeDiacritics } from '../helpers/removeDiacritics.js';

const router = express.Router();

router.get('/weather', async (req, res) => {
    const cityQ = req.query.city;

    if (!cityQ) {
        return res.status(400).json({ message: 'City parameter is required.' });
    }

    const city = removeDiacritics(cityQ as string);

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}&lang=pl`);

        if (response.ok) {
            const data = await response.json();
            res.status(200).send(data);
        } else {
            res.status(response.status).json({ message: response.statusText });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

export default router;