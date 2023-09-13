import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import transactionsRouter from './routes/transactionsRouter.js';

const app = express();
dotenv.config();

app.use([cors(), json()]);
app.use(authRouter);
app.use(transactionsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`💻 Back-end started at ${PORT}...`));
