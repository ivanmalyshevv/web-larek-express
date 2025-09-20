import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import errorHandler from './middlewares/error-handler';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import { errorLogger, requestLogger } from './middlewares/logger';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
