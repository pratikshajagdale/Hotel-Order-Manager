import dotenv from "dotenv";
dotenv.config();

export default {
  app: {
    env: process.env.NODE_ENV,
    port: Number(process.env.PORT),  
  },
  jwtSecret: process.env.JWT_SECRET,
  db: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT
  }
};





