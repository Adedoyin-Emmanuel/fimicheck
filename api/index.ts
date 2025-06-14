import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import "express-async-errors";
import bodyParser from "body-parser";

import corsOptions from "./utils/cors-options";
import baseRouter from "./features/base/route";
import { accessLogStream, logger } from "./utils";
import { useErrorHandler, useNotFound } from "./middlewares/";
import { PORT, IS_PRODUCTION, MORGAN_CONFIG } from "./constants/app";

dotenv.config();

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json({}));
app.use(
  morgan(MORGAN_CONFIG, {
    stream: IS_PRODUCTION ? accessLogStream : process.stdout,
  })
);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", baseRouter);

app.use(useNotFound);
app.use(useErrorHandler);

export const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
