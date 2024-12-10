import { Router } from "express";
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userSigninSchema, userSignupSchema } from "../validation/user-schemas.js";
import {resetPasswordController, signupController, signinController, refreshController, logoutController, requestResetEmailController} from "../controllers/auth.js";
import { requestResetEmailSchema, resetPasswordSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post('/register', validateBody(userSignupSchema), ctrlWrapper(signupController));

authRouter.post('/login', validateBody(userSigninSchema), ctrlWrapper(signinController));

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post('/send-reset-email', validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController));

authRouter.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController),);

export default authRouter;
