import createHttpError from "http-errors";
import User from "../db/models/User.js";
import { compareHash } from "../utils/hash.js";
import Session from "../db/models/Session.js";
import { randomBytes } from "node:crypto";
import { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from "../constants/index.js";
import { hashValue } from "../utils/hash.js";

export const findUser = filter => User.findOne(filter);
export const findSession = filter => Session.findOne(filter);

export const signup = async (data) => {
    const { password } = data;
    const hashPassword = await hashValue(password);
    const user = await User.findOne({ email: data.email });
    if (user) throw createHttpError(409, 'Email in use');

    return User.create({...data, password: hashPassword});
};

export const signin = async (data) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    const isEqual = await compareHash(data.password, user.password);
    if (!isEqual) {
        throw createHttpError(401, 'Unauthorized');
    }

};

export const createSession = async (userId) => {
    await Session.deleteOne({userId});
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME);
    const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFETIME);

    return Session.create({
        userId,
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil
    });
 };

export const deleteSession = filter => Session.deleteOne(filter);
