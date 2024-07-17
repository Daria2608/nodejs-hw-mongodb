import express from 'express';
import { getContactsController, getContactByIdController, addContactController, updateContactController, deleteContactController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import { contactAddSchema, contactUpdateSchema } from '../validation/contact-schemas.js';
import authenticate from '../middlewares/authenticate.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post('/', validateBody(contactAddSchema), ctrlWrapper(addContactController));

contactsRouter.patch('/:contactId', isValidId, validateBody(contactUpdateSchema), ctrlWrapper(updateContactController));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
