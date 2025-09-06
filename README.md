# Weather App Backend 🌦️

Backend for the weather application, written in Node.js and Express. It serves as a proxy and caching layer for the [Open-Meteo API](https://open-meteo.com/), enhancing performance and adding security.

---

## Features

- **Proxy Server**: Manages communication with the Open-Meteo API, acting as a single point of contact for the frontend application.
- **Caching**: Implements a 15-minute cache for weather data requests to reduce latency and minimize external API calls.
- **Rate Limiting**: Protects the API from abuse by limiting the number of requests from a single IP address.
- **Input Validation**: Uses **Zod** to validate incoming request parameters, ensuring data integrity and preventing errors.
- **TypeScript**: Fully written in TypeScript for type safety and better maintainability.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Zod** (for validation)
- **node-cache** (for caching)
- **express-rate-limit** (for security)

---

## Getting Started

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd weather-app-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create and configure the `.env` file:**
    Create a `.env` file in the root directory. It requires the following variables:
    ```env
    # The port the server will run on
    PORT=5000

    # URL for Open-Meteo Geocoding API
    OPEN_METEO_GEOCODING_API="https://geocoding-api.open-meteo.com/v1/search"

    # URL for Open-Meteo Weather API
    OPEN_METEO_WEATHER_API="https://api.open-meteo.com/v1/forecast"
    ```

4.  **Run the server:**
    - For development (with auto-reload via `nodemon`):
        ```bash
        npm run dev
        ```
    - For production:
        ```bash
        npm run build
        npm start
        ```
    The server will be running at `http://localhost:5000` (or the port you specified).

---

## API Endpoints

The server provides the following endpoints:

### `GET /api/weather/current`

Fetches current, daily, and hourly weather data for a given location.

- **Query Parameters:**
    - `lat` (number, required): The latitude of the location.
    - `lon` (number, required): The longitude of the location.
- **Example:** `http://localhost:5000/api/weather/current?lat=52.52&lon=13.41`

### `GET /api/weather/autocomplete`

Provides a list of city suggestions based on a search query.

- **Query Parameter:**
    - `q` (string, required): The search term for the city.
- **Example:** `http://localhost:5000/api/weather/autocomplete?q=Berlin`

---

## License

This project is licensed under the MIT License.
