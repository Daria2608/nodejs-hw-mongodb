import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import { getContacts, getContactById } from './services/contacts.js';

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

app.use((req, res, next) => {
    console.log('1');
    next();
});

app.get('/contacts', async (req, res) => {
    const data = await getContacts();
    res.json(
        {
            status: 200,
            data,
            message: 'Successfully found contacts!',
        }
    );
});

    app.get('/contacts/:contactId', async (req, res) => {
        try {

        const { contactId } = req.params;
        const data = await getContactById(contactId);

        if (!data) {
            return res.status(404).json({
                 message: `Contact with ${contactId} not found`
            });
        };

     res.json(
        {
            status: 200,
            data,
            message: `Successfully found contact with id ${contactId}!`,
        }
    );
        } catch (error) {
             if (error.message.includes("Cast to ObjectId failed")) {
                error.status = 404;
            }
            const { status = 500 } = error;
            res.status(status).json({
                message: error.message
            });
        }

 });

    app.use((req, res) => {
    res.status(404).json({
  message: 'Not found',
}
);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
};

export default setupServer;


