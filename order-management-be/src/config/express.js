import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json" with { type: "json" };
import routes from "../api/routes/index.js";

// create app using express
const app = express();

// middlware in express for parsing body
app.use(express.json());

// allow all origins for cors
app.use(cors({ origin: '*' }));

// serve swaggger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// prefix for all the routes
app.use('/api', routes);

export default app;