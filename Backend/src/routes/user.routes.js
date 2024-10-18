import { changePasswordController, getUserInfo, getUsers, updateProfile, updateStatus } from "../controllers/user.controller.js";
import { checkPermission } from "../middlewares/check-permission.js";
import express from 'express'
import { validationChangePassword, validationUpdateProfile } from "../middlewares/user.middleware.js";
import { verifyToken } from "../middlewares/verify-token.middleware.js";



const router = express.Router();

// change password
router.patch(
    '/change-password',
    (verifyToken),
    (validationChangePassword),
    (changePasswordController),
  );
  
  // get user info
  router.get('/me', (verifyToken), (getUserInfo));
  
  // get users
  router.get(
    '/users',
    (verifyToken),
    (checkPermission),
    (getUsers),
  );
  
  // update status user
  router.patch(
    '/user/:userId/:status',
    (verifyToken),
    (checkPermission),
    (updateStatus),
  );
  
  // update profile
  router.patch(
    '/me',
    (verifyToken),
    (validationUpdateProfile),
    (updateProfile),
  );
  
  export default router;
  