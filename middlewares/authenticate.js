import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") next(HttpError(401));
  const { SECRET_KEY } = process.env;
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) next(HttpError(401));
    if (!user.verify) throw HttpError(401, "Need verification your email");
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};
