import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import fs from "fs";
import path from "path";


const logDir = "logs"; // Logs directory
if (!fs.existsSync(logDir)) {
    try {
        fs.mkdirSync(logDir);
    } catch (err) {
        console.error("Error creating log directory:", err);
        // Handle the error appropriately
    }
}


const logger = createLogger({
    level: "info",
    format: format.combine(format.timestamp(),
        format.json()),

    transports: [
        new transports.Console({
            format: format.combine(format.colorize(),
                format.printf(
                    (
                        {
                            level,
                            message,
                            timestamp
                        }
                    ) => {
                        return `[${timestamp}] , ${level} : ${message}`;
                    }
                )),
        }),

        new transports.DailyRotateFile({
            filename: path.join(logDir, "app-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "10m",
            maxFiles: "14d", // to keep logs for 14days
        }),
    ],

});