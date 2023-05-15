import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";
import { nanoid } from "nanoid";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema({
  nickname: {
    type: String,
    minlength: 2,
    default: `user${nanoid(5)}`,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailRegex,
    unique: true,
  },
  token: {
    type: String,
    default: "",
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: "",
  },
  avatarURL: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "user",
  },
});

export const registerScheme = Joi.object({
  nickname: Joi.string().min(2),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegex).required(),
});

export const loginScheme = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegex).required(),
});

export const emailScheme = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);
