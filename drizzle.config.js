import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const config = {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};

export default config;
