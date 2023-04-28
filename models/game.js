import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

const gameScheme = new Schema(
  {
    gameID: { type: String, required: true },
    name: { type: String, required: true },
    backdrop: { type: String, required: true },
    rating: { type: Number, default: 0 },
    owners: { type: Array, default: [] },
  },
  { versionKey: false, timestamps: true }
);

export const addGameScheme = Joi.object({
  gameID: Joi.string().required(),
  name: Joi.string().required(),
  backdrop: Joi.string().required(),
  rating: Joi.number(),
});

gameScheme.post("save", handleMongooseError);

export const Game = model("games", gameScheme);
