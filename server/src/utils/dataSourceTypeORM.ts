import { List } from "../entities/List";
import { User } from "../entities/User";
import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
    type: "postgres",
    database: "shop-co-op2",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [User, List],
});