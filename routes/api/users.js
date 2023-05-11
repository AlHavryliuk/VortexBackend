import express from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import {
  patchUserAvatarCtrl,
  patchUserNameCtrl,
} from "../../controllers/users.js";
import { upload } from "../../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.patch("/credentials", authenticate, patchUserNameCtrl);
usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  patchUserAvatarCtrl
);

export default usersRouter;
