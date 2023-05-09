import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { User } from "../models/user.js";

const patchUserName = async (req, res) => {
  const { nickname } = req.body;
  const hasAlreadyAdded = await User.findOne({ nickname });
  if (hasAlreadyAdded || nickname.trim().length === 0)
    throw HttpError(409, "User with this name is already added");
  const result = await User.findOneAndUpdate(
    { nickname },
    { nickname },
    { new: true }
  );
  res.status(201).json(result);
};

export const patchUserNameCtrl = ctrlWrapper(patchUserName);
