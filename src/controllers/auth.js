// import createHttpError from "http-errors";
import { signin, signup } from "../services/auth.js";
import { createSession, findSession, deleteSession } from "../services/auth.js";
import User from "../db/models/User.js";
import createHttpError from "http-errors";


const setupResponseSession = (res, { refreshToken, refreshTokenValidUntil, _id }) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });

     res.cookie('sessionID', _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
     });
};

export const signupController = async (req, res) => {
    const newUser = await signup(req.body);

    const data = {
        name: newUser.name,
        email: newUser.email,
    };

    res.status(201).json({
        status: 201,
        data,
        message: 'Successfully registered a user!',
    });
};

export const signinController = async (req, res) => {
    await signin(req.body);

    const { email } = req.body;

    const user = await User.findOne({email});

    const sesion = await createSession(user._id);

    setupResponseSession(res, sesion);

    res.status(200).json({
        status: 200,
        data: {
            accessToken: sesion.accessToken,
        },
        message: 'Successfully refreshed a session!',
    });


 };

export const refreshController = async (req, res) => {
    const { refreshToken, sessionID } = req.cookies;
    const currentSession = await findSession({ _id: sessionID, refreshToken });
    if (!currentSession) {
        throw createHttpError(401, 'Session not found');
    }

    const refreshTokenExpired = Date.now() > new Date(currentSession.refreshTokenValidUntil);
    if (refreshTokenExpired) {
       throw createHttpError(401, 'Session expired');
    }

    const newSession = await createSession(currentSession.userId);

    setupResponseSession(res, newSession);

    res.status(200).json({
        status: 200,
        data: {
            accessToken: newSession.accessToken,
        },
        message: 'Successfully refreshed a session!',
    });
};

export const logoutController = async (req, res) => {
    const { sessionID } = req.cookies;
    if (!sessionID) {
        throw createHttpError(401, 'Session not found');
    }
    await deleteSession({ _id: sessionID });

    res.clearCookie('sessionID');
    res.clearCookie('refreshToken');

    res.status(204).send();
};
