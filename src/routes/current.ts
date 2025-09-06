import express from 'express';
import { config } from "../config.js";
import { CurrentSchema } from '../types.js';

const WEATHER_URL = config.weatherData.weatherUrl;

if (!WEATHER_URL) {
    console.error('FATAL ERROR: WEATHER_URL is not defined.');
    process.exit(1);
}

const router = express.Router();

router.get('/current', async (req, res) => {
    const result = CurrentSchema.safeParse(req.query);

    if (!result.success) {
        return res.status(400).json({ errors: result.error.flatten().fieldErrors})
    }

    const lat = result.data.lat;
    const lon = result.data.lon;

    try {
        const response = await fetch(`${WEATHER_URL}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe%2FBerlin&current=temperature_2m,weather_code,pressure_msl,relative_humidity_2m,is_day&hourly=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m`);

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