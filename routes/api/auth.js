import express from "express";
import validateBody from "../../middlewares/validateBody.js";
import { emailScheme, loginScheme, registerScheme } from "../../models/user.js";
import {
  getCurrentCtrl,
  loginCtrl,
  logoutCtrl,
  registerCtrl,
  resendVerifyCtrl,
  verifyCtrl,
} from "../../controllers/auth.js";
import { authenticate } from "../../middlewares/authenticate.js";

export const authRouter = express.Router();

authRouter.post("/register", validateBody(registerScheme), registerCtrl);
authRouter.post("/login", validateBody(loginScheme), loginCtrl);
authRouter.post("/logout", authenticate, logoutCtrl);
authRouter.get("/current", authenticate, getCurrentCtrl);
authRouter.get("/verify/:verificationCode", verifyCtrl);
authRouter.get("/verify/repeat", validateBody(emailScheme), resendVerifyCtrl);
