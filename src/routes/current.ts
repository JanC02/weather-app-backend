import express from 'express';
import { config } from "../config.js";

const WEATHER_URL = config.weatherData.weatherUrl;

if (!WEATHER_URL) {
    console.error('FATAL ERROR: WEATHER_URL is not defined.');
    process.exit(1);
}

const router = express.Router();

router.get('/current', async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;

    if (!lat) {
        return res.status(400).json({ message: 'Latitude parameter is required.' });
    }

    if (!lon) {
        return res.status(400).json({ message: 'Longitude parameter is required.' });
    }

    if (typeof lat !== 'string' || typeof lon !== 'string') {
        return res.status(400).json({ message: 'Latitude and longitude must be strings.' });
    }

    const latitude = lat.trim();
    const longitude = lon.trim();

    try {
        const response = await fetch(`${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe%2FBerlin&current=temperature_2m,weather_code,pressure_msl,relative_humidity_2m,is_day&hourly=temperature_2m,apparent_temperature,precipitation`);

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