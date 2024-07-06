import express from 'express';
import { getContactsController, getContactByIdController, addContactController, updateContactController, deleteContactController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post('/', ctrlWrapper(addContactController));

contactsRouter.patch('/:contactId', isValidId, ctrlWrapper(updateContactController));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
