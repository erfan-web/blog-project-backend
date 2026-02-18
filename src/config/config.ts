import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: string;
  nodeEnv: string;
  jwtSecret: string;
}

const config: Config = {
  port: process.env.PORT || "8000",
  jwtSecret: process.env.JWT_SECRET!,
  nodeEnv: process.env.NODE_ENV || "development",
};

export default config;
