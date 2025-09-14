import express from 'express';
import cors from 'cors';
import { config } from "./config.js";
import current from './routes/current.js';
import autocomplete from './routes/autocomplete.js';
import { rateLimit } from 'express-rate-limit';
 
const PORT = config.port;

if (!PORT) {
    console.error('FATAL ERROR: PORT is not defined.');
    process.exit(1);
}

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 min
	limit: 100, // 100 requests
	standardHeaders: 'draft-8',
	legacyHeaders: false,
});

const app = express();
app.set('trust proxy', 1);

// middleware
app.use(cors());
app.use(express.json());
app.use(limiter);

// routes
app.use('/api/weather', current);
app.use('/api/weather', autocomplete);

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});