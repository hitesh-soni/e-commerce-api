import express from 'express';
import AuthController from 'modules/auth/controller/AuthController';
import AuthValidation from 'modules/auth/validation/authValidation';
import TokenValidation from 'modules/auth/validation/tokenValidation';
import { upload } from 'helper';

const router = express.Router();

// User Login
router.post('/login', AuthValidation.loginUser, AuthController.login);

// User registration
router.post(
    '/register',
    upload.fields([{ name: 'profile_photo', maxCount: 1 }]),
    AuthValidation.createUser,
    AuthController.create,
);

// Refresh Token
router.post('/token', TokenValidation.verify, AuthController.generateToken);

export default router;
