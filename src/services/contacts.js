import Contact from "../db/models/Contact.js";
import calcPaginationData from "../utils/calcPaginationData.js";

export const getContacts = async ({ filter, page, perPage, sortBy, sortOrder }) => {
    const skip = (page - 1) * perPage;
    const request = Contact.find();
    if (filter.type) {
        request.where('contactType').equals(filter.contactType);
    }
    if (filter.isFavourite) {
        request.where('isFavourite').equals(filter.isFavourite);
    }

    const data = await request.skip(skip).limit(perPage).sort({[sortBy] : sortOrder});
    const totalItems = await Contact.find().merge(request).countDocuments();
    const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({total: totalItems, page, perPage});

    return {
        data,
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage,
    };
};

export const getContactById = id => Contact.findById(id);

export const addContact = data => Contact.create(data);

export const updateContact = async (filter, data, options = {}) => {
    const result = await Contact.findOneAndUpdate(filter, data, {
        // new: true,
        // runValidators: true,
        includeResultMetadata: true,
        ...options
    }
    );

    if (!result || !result.value) return null;

    const isNew = Boolean(result?.lastErrorObject?.upserted);

    return {
        data: result.value,
        isNew,
     };
};

export const deleteContact = filter => Contact.findOneAndDelete(filter);
