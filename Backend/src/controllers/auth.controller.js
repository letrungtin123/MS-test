import * as dotenv from 'dotenv';

import { checkEmailExist, createUser } from '../services/auth.service.js';

import { HTTP_STATUS } from '../common/http-satus.common.js';
import { handleGenerateToken } from '../utils/jwt.util.js';
import { handleHashPassword } from '../utils/hash-password.util.js';

dotenv.config();

export const registerController = async (req, res) => {
    const body = req.user;

    //check email
    const user = await checkEmailExist(body.email);
    if(user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: 'Email already existed!',
            success: false,
        });
    };

    //hash password
    const hashPassword = await handleHashPassword({password: body.password, saltNumber: 5});

    //create user in db
    const newUser = await createUser({...body, password: hashPassword});

    if (!newUser) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: 'User created failed!',
            success: false,
        });
    };

    //generate token
    const accessToken = await handleGenerateToken({payload: {_id: newUser, email: newUser.email} });

    return res.status(HTTP_STATUS.CREATED).json({
        message: 'User created successfully!',
        success: true,
        accessToken,
    });
};