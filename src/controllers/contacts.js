import { getContacts, getContactById, addContact, updateContact, deleteContact } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {

       const data = await getContacts();
    res.json(
        {
            status: 200,
            data,
            message: 'Successfully found contacts!',
        }
    );
};

export const getContactByIdController = async (req, res) => {

        const { contactId } = req.params;
        const data = await getContactById(contactId);

        if (!data) {
            throw createHttpError(404, `Contact with ${contactId} not found`);
        };

        res.json(
            {
                status: 200,
                data,
                message: `Successfully found contact with id ${contactId}!`,
            }
        );

};

export const addContactController = async (req, res) => {
    const data = await addContact(req.body);
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
 };

export const updateContactController = async (req, res) => {
    const { contactId } = req.params;
    const data = await updateContact({ _id: contactId }, req.body);


    if (!data) {
            throw createHttpError(404, `Contact with ${contactId} not found`);
        };

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: data.data
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;

    const result = await deleteContact({ _id: contactId });

      if (!result) {
            throw createHttpError(404, `Contact not found`);
    };

    res.status(204).json();
};
