import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { useErrorHandler, useNotFound } from "./middlewares/";
import corsOptions from "./utils/corsOptions";
import { accessLogStream, logger } from "./utils";
import { PORT, IS_PRODUCTION, MORGAN_CONFIG } from "./constants/app";
import helmet from "helmet";


import baseRouter from "./features/base/route";
import swaggerRouter from "./swagger";
dotenv.config();

const app = express();

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(
  morgan(MORGAN_CONFIG, {
    stream: IS_PRODUCTION ? accessLogStream : process.stdout,
  })
);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", baseRouter);
app.use("/api-docs", swaggerRouter);

app.use(useNotFound);
app.use(useErrorHandler);

export const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
