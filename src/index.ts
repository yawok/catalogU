import express from 'express';
import { config } from 'dotenv';
import { getUserIPDetails } from './controllers/controller';

config()
const app = express();
const PORT = process.env.PORT || 3000;

app.route('/').get(getUserIPDetails);

app.listen(PORT);