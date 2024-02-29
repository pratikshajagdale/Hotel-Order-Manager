import express from "express";
import cors from "cors";
import routes from "../api/routes/index.js";

// create app using express
const app = express();

// middlware in express for parsing body
app.use(express.json());

// allow all origins for cors
app.use(cors({ origin: '*' }));

// prefix for all the routes
app.use('/api', routes);

export default app;