import dotenv from "dotenv";
dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
};
