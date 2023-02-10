import winston from "winston";
/**
 * This file can be customised based on the requirements
 */
const logConfiguration = {
    transports: [
        new winston.transports.File({
            level: "info" || "error" || "warn",
            filename: "logs/logs.log",
        }),
        new winston.transports.Console({
            level: "info" || "error" || "warn",
        }),
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
        }),
        winston.format.ms(),
        winston.format.printf(
            (log: any) =>
                `${log.level}: ${[log.timestamp]}: ${log.message} : ${[log.ms]}`
        )
    ),
};

const logger = winston.createLogger(logConfiguration);

export default logger;
