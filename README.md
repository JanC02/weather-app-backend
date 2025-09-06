# Weather Data Server 🌦️

A simple server written in Node.js and Express, designed to act as a proxy and caching layer for a weather application. This server hides and caches requests to the free and open-source [Open-Meteo API](https://open-meteo.com/) to improve performance and reliability.

***

## Tech Stack

* **Node.js**
* **Express.js**
* **TypeScript**

***

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <project-folder-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Copy the `.env.example` file (if it exists) or create a new `.env` file in the root directory and add the required port variable:
    ```env
    # The port the server will run on
    PORT=5000
    ```

4.  **Run the server:**
    * For development (with auto-reload):
        ```bash
        npm run dev
        ```
    * For production:
        ```bash
        npm run build
        npm start
        ```

***

## API Endpoints

The server provides endpoints to fetch weather and location data.

### `GET /api/weather/current`

Fetches the current weather data for a given location using geographic coordinates.

* **Query Parameters:**
    * `lat` (number, required) - The latitude of the location.
    * `lon` (number, required) - The longitude of the location.
* **Example:** `http://localhost:5000/api/weather/current?lat=49.90717273632199&lon=21.048124934340873`

### `GET /api/weather/autocomplete`

Provides a list of city suggestions based on the user's query, using geocoding.

* **Query Parameter:** `q` (string, required)
* **Example:** `http://localhost:5000/api/weather/autocomplete?q=Tuch`

***

## License

This project is licensed under the MIT License.