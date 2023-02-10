import { cleanEnv, str, port } from "envalid";
import logger from "./logger";

function validateEnv(): void {
    logger.info("Enter- '/utils/validateEnv.ts/validateEnv'");

    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ["development", "production"],
        }),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        PORT: port({ default: 3000 }),
    });
    logger.info("Exit- '/utils/validateEnv.ts/validateEnv'");
}

export default validateEnv;
