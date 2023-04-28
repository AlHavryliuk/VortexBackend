export const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  if (code === 11000 && name === "MongoServerError") error.status = 409;
  else error.status = 400;
  next();
};
