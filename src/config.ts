import 'dotenv/config';

export const config = {
    port: process.env.PORT,
    autocomplete: {
        maxResults: 20,
        responseLanguage: 'pl',
        geocodingUrl: process.env.OPEN_METEO_GEOCODING_API
    },
    weatherData: {
        weatherUrl: process.env.OPEN_METEO_WEATHER_API
    }
}