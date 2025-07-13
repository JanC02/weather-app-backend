# Weather API Proxy 🌦️

A simple proxy server written in Node.js and Express, designed to securely handle requests to the [WeatherAPI](https://www.weatherapi.com/). This application hides the API key from the client-side (frontend), enhancing security.

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
    Copy the `.env.example` file (if it exists) or create a new `.env` file in the root directory and add the required variables:
    ```env
    # The port the server will run on
    PORT=5000

    # Your private API key
    WEATHER_API_KEY=your_api_key_here
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

## API Endpoint

The server provides a single endpoint to fetch weather data.

### `GET /api/weather`

Fetches the current weather data for a given location.

* **Query Parameter:** `city` (string, required)
* **Example:** `http://localhost:5000/api/weather?city=London`

***

## License

This project is licensed under the MIT License.