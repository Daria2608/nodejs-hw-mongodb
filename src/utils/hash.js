import bcrypt from "bcryptjs";

export const hashValue = value => bcrypt.hash(value, 10);

export const compareHash = (value, hash) => bcrypt.compare(value, hash);
