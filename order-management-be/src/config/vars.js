import dotenv from "dotenv";
dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  db: process.env.DB,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  dialect: process.env.DIALECT,
};





