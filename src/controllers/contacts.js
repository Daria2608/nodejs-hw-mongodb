import { getContacts, getContact, addContact, updateContact, deleteContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { fieldList } from '../constants/constants.js';
import parseContactFilterParams from '../utils/parseContactFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import env from '../utils/env.js';

export const getContactsController = async (req, res) => {

    const { _id: userId } = req.user;
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, fieldList);
    const filter = { ...parseContactFilterParams(req.query), userId };


       const data = await getContacts({page, perPage, sortBy, sortOrder, filter});
    res.json(
        {
            status: 200,
            data,
            message: 'Successfully found contacts!',
        }
    );
};

export const getContactByIdController = async (req, res) => {

        const { _id: userId } = req.user;
        const { contactId: _id } = req.params;
        const data = await getContact({_id, userId});

        if (!data) {
            throw createHttpError(404, `Contact with ${_id} not found`);
        };

        res.json(
            {
                status: 200,
                data,
                message: `Successfully found contact with id ${_id}!`,
            }
        );

};

export const addContactController = async (req, res) => {
    const { _id: userId } = req.user;
    const photo = req.file;

    let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

    const data = await addContact({ ...req.body, userId, photo: photoUrl});

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
 };

export const updateContactController = async (req, res) => {

    const { _id: userId } = req.user;
    const { contactId } = req.params;
    const photo = req.file;

    let photoUrl;

     if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

    const data = await updateContact({ _id: contactId, userId, }, {...req.body, photo: photoUrl});

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
    const { _id: userId } = req.user;
    const { contactId } = req.params;

    const result = await deleteContact({ _id: contactId, userId });

      if (!result) {
            throw createHttpError(404, `Contact not found`);
    };

    res.status(204).json();
};
