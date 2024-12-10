import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import env from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const port = env('PORT', '3000');

const setupServer = () => {

const app = express();

const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

app.use(logger);

app.use(cors());


app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api-docs', swaggerDocs());


app.use((req, res, next) => {
    console.log('1');
    next();
});

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
};

export default setupServer;


