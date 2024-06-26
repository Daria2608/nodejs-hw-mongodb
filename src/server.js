import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';

const port = env('PORT', '3000');

export const setupServer = () => {

const app = express();

const { PORT } = process.env;

const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

app.use(logger);

app.use(cors());

app.use((req, res, next) => {
    console.log('1');
    next();
});

app.get('/contacts', (request, response) => {
    // response.send(contacts);
    response.json({
    message: 'Hello world!',
  });
});

    app.get('/contacts/:contactId', (request, response) => {
     response.json({
    message: 'Hello world!',
  });
 });

app.use((request, response) => {
    response.status(404).json({
  message: 'Not found',
}
);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
};





