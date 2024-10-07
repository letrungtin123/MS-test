import * as dotenv from "dotenv";

import { checkEmailExist, createUser } from "../services/auth.service.js";
import {
  handleComparePassword,
  handleHashPassword,
} from "../utils/hash-password.util.js";

import { HTTP_STATUS } from "../common/http-satus.common.js";
import { handleGenerateToken } from "../utils/jwt.util.js";

dotenv.config();

export const registerController = async (req, res) => {
  const body = req.user;

  //check email
  const user = await checkEmailExist(body.email);
  if (user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: "Email already existed!",
      success: false,
    });
  }

  //hash password
  const hashPassword = await handleHashPassword({
    password: body.password,
    saltNumber: 5,
  });

  //create user in db
  const newUser = await createUser({ ...body, password: hashPassword });

  if (!newUser) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "User created failed!",
      success: false,
    });
  }

  //generate token
  const accessToken = await handleGenerateToken({
    payload: { _id: newUser, email: newUser.email },
  });

  return res.status(HTTP_STATUS.CREATED).json({
    message: "User created successfully!",
    success: true,
    accessToken,
  });
};
export const loginController = async (req, res) => {
  const body = req.user;

  //check email
  const user = await checkEmailExist(body.email);
  if (!user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: "Email is not found!",
      success: false,
    });
  }

  //compare password
  const isMatch = await handleComparePassword({
    password: body.password,
    hashPassword: user.password,
  });
  if (!isMatch) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: "Password is not match!",
      success: false,
    });
  }

  //generate token
  const accessToken = await handleGenerateToken({
    payload: { _id: user._id, email: user.email, role: user.role },
  });

  return res.status(HTTP_STATUS.OK).json({
    message: "Login successfully!",
    success: true,
    accessToken,
  });
};

//send email
export const sendEmailController = async (req, res) => {
  const { email } = req.email;

  const user = await checkEmailExist(email);
  if (!user) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Email is not existed!",
      success: false,
    });
  }
  if (user) {
    //generate token
    const accessToken = await handleGenerateToken({
      payload: { email: user.email },
      secretKey: process.env.SEND_EMAIL_SECRET_KEY,
      expiresIn: "1h",
    });

    //link reset password
    const link = `${process.env.URL_SERVER}/reset-password?token=${accessToken}`;

    //send email
    return res.status(HTTP_STATUS.OK).json({
      message: "Email was sent successfully!",
      success: true,
      link,
    });
  }
};
