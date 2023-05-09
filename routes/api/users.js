import express from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { patchUserNameCtrl } from "../../controllers/users.js";

const usersRouter = express.Router();

usersRouter.patch("/credentials", authenticate, patchUserNameCtrl);

export default usersRouter;
