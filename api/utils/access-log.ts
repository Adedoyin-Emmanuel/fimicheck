import fs from "fs";
import path from "path";

const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const accessLogPath = path.join(logDir, "access.log");
if (!fs.existsSync(accessLogPath)) {
  fs.writeFileSync(accessLogPath, "");
}

const accessLogStream = fs.createWriteStream(accessLogPath, { flags: "a" });

export default accessLogStream;
