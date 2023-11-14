import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  // username: "postgres",
  // password: "postgres",
  username: "tips_admin",
  password: "t1ps4dm1n",
  database: "tips-local",
  // Note: for a production-ready application, we should be changing the synchronize property in the data-source.ts file to false and use the concept of DB migrations instead which is supported by TypeORM out of the box. This is because the synchronize property is not recommended for production use as it can lead to data loss.
  //   synchronize: false,
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts"],
  migrations: [],
  subscribers: [],
});
