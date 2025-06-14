import winston from "winston";
import fs from "fs";
import path from "path";

const { combine, timestamp, json } = winston.format;

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const errorLogPath = path.join(logDir, "error.log");
const combinedLogPath = path.join(logDir, "combined.log");

if (!fs.existsSync(errorLogPath)) {
  fs.writeFileSync(errorLogPath, "");
}

if (!fs.existsSync(combinedLogPath)) {
  fs.writeFileSync(combinedLogPath, "");
}

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      dirname: logDir,
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({
      dirname: logDir,
      filename: "combined.log",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.colorize(),
    })
  );
}

export default logger;
