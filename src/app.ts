import express from "express";
import cors from "cors";
import { router as productsRouter } from './routes/products';
import { routerC as categoriesRouter } from './routes/categories';
import { logMiddleware } from './middleware/log';
import { validationErrorHandler } from "./middleware/error";
import { initConfig } from "./utils/configuration";
import path from 'path';

initConfig();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logMiddleware);
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/api/products', productsRouter); //handle requests about products
app.use('/api/categories', categoriesRouter); //handle requests about categories

app.use(validationErrorHandler);

export { app };





