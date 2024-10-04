import express from "express";
import { registerController } from "../controllers/auth.controller.js";
import { validationRegiser } from "../middlewares/auth.middleware.js";
import { wrapRequestHandler } from "../utils/handlers.util.js";

const router = express.Router();

//register
router.post(
  "/register",
  wrapRequestHandler(validationRegiser),
  wrapRequestHandler(registerController),
);

export default router;

