import express from "express";
import {
  addGameCtrl,
  getGamesCtrl,
  getGameByIdCtrl,
  updateOwnerCtrl,
} from "../../controllers/games.js";
import { authenticate } from "../../middlewares/authenticate.js";
import validateBody from "../../middlewares/validateBody.js";
import { addGameScheme } from "../../models/game.js";

const gamesRouter = express.Router();

gamesRouter.get("/", authenticate, getGamesCtrl);

gamesRouter.get("/:gameID", authenticate, getGameByIdCtrl);

gamesRouter.post("/", authenticate, validateBody(addGameScheme), addGameCtrl);

gamesRouter.patch("/:gameID", authenticate, updateOwnerCtrl);

export default gamesRouter;
