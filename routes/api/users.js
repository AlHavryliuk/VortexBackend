import express from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import {
  getUserListCtrl,
  patchUserAvatarCtrl,
  patchUserNameCtrl,
} from "../../controllers/users.js";
import { upload } from "../../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.patch("/credentials", authenticate, patchUserNameCtrl);
usersRouter.get("/all", authenticate, getUserListCtrl);
usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  patchUserAvatarCtrl
);

export default usersRouter;
