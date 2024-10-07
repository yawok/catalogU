import express from 'express';
import { config } from 'dotenv';
import { getUserIPDetails } from './controller';
import { getDB as getDb } from './dbService';

config()
const app = express();
const PORT = process.env.PORT || 3000;
getDb(process.env.DB_URL)

app.route('/').get(getUserIPDetails);

app.listen(PORT);