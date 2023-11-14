import * as dotenv from "dotenv";
dotenv.config();

// Checks .env for the following variables or defaults to the values below
export default {
  postgresUser: process.env.POSTGRES_USER ?? "postgres",
  postgresPassword: process.env.POSTGRES_PASSWORD ?? "postgres",
};
