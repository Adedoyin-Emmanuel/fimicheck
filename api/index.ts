import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import "express-async-errors";
import bodyParser from "body-parser";

import { PORT } from "./constants/app";
import corsOptions from "./utils/cors-options";
import baseRouter from "./features/base/route";
import lookupRouter from "./features/lookup/route";
import { useErrorHandler, useNotFound } from "./middlewares/";

dotenv.config();

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json({}));
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json({ limit: "1mb" }));

app.use("/v1", baseRouter);
app.use("/v1/lookup", lookupRouter);

app.use(useNotFound);
app.use(useErrorHandler);

export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
