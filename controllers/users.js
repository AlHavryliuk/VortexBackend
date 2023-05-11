import fs from "fs/promises";
import { nanoid } from "nanoid";
import HttpError from "../helpers/HttpError.js";
import cloudinary from "../helpers/cloudinaryConfig.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { User } from "../models/user.js";
import validateFile from "../helpers/imgIsValid.js";

const patchUserName = async (req, res) => {
  const { nickname } = req.body;
  const { _id: id } = req.user;
  const hasAlreadyAdded = await User.findOne({ nickname });
  if (hasAlreadyAdded || nickname.trim().length === 0)
    throw HttpError(409, "User with this name is already added");
  const result = await User.findByIdAndUpdate(id, { nickname }, { new: true });
  res.status(201).json(result);
};

const patchUserAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempPath } = req.file;
  const { validSuccess, message } = await validateFile(tempPath);
  if (!validSuccess) {
    await fs.unlink(tempPath);
    throw HttpError(400, message);
  }
  const result = await cloudinary.v2.uploader.upload(tempPath, {
    public_id: `vortex_avatars/${_id}${nanoid()}`,
  });
  await fs.unlink(tempPath);
  const { secure_url: avatarURL } = result;

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(201).json({ avatarURL });
};

export const patchUserNameCtrl = ctrlWrapper(patchUserName);
export const patchUserAvatarCtrl = ctrlWrapper(patchUserAvatar);
