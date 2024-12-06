import { List } from "../entities/List";
import { User } from "../entities/User";
import { DataSource } from "typeorm";
import 'dotenv/config';

export const appDataSource = new DataSource({
    type: "postgres",
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    logging: true,
    synchronize: true,
    entities: [User, List],
});