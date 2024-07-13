import { typeList } from "../constants/constants.js";

const parseBoolian = value => {
    if (typeof value !== 'string') return;

    if (!['true', 'false'].includes(value)) return;

    if (value === 'true') return true;

    if (value === 'false') return false;
 };

const parseContactFilterParams = ({ contactType, isFavourite }) => {

    const parsedType = typeList.includes(contactType) ? contactType : null;
    const parsedIsFavourite = parseBoolian(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedIsFavourite,
    };
 };

export default parseContactFilterParams;
