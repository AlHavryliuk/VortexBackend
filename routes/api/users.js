import express from "express";
import { authenticate } from "../../middlewares/authenticate";
import { patchUserNameCtrl } from "../../controllers/users";

const usersRouter = express.Router();

usersRouter.patch("/credentials", authenticate, patchUserNameCtrl);

export default usersRouter;
