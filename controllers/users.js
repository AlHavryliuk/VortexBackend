import HttpError from "../helpers/HttpError";
import ctrlWrapper from "../helpers/ctrlWrapper";
import { User } from "../models/user";

const patchUserName = async (req, res) => {
  const { nickname } = req.body;
  const hasAlreadyAdded = await User.findOne({ nickname });
  if (hasAlreadyAdded)
    throw HttpError(409, "User with this name is already added");
  const result = await User.findOneAndUpdate(
    { nickname },
    { nickname },
    { new: true }
  );
  res.status(201).json(result);
};

export const patchUserNameCtrl = ctrlWrapper(patchUserName);
