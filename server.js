import mongoose from "mongoose";
import app from "./app.js";

const HOST = process.env.DB_HOST;

mongoose
  .connect(HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3005, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
