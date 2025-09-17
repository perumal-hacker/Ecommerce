import mongoose from "mongoose";

export const connectDatabase = () => {
  let DB_URI = "";

  if (process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
  if (process.env.NODE_ENV === "PRODUCTION") DB_URI = process.env.DB_URI;

  if (!DB_URI) {
    console.error("❌ ERROR: Database URI is not defined in environment variables");
    process.exit(1);
  }

  mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((con) => {
      console.log(
        `✅ MongoDB Database connected with HOST: ${con?.connection?.host}`
      );
    })
    .catch((err) => {
      console.error(`❌ MongoDB Connection Error: ${err.message}`);
      process.exit(1);
    });
};
