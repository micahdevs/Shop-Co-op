import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { __prod__ } from "./constants";
import { List } from "./entities/List";
import { User } from "./entities/User";
import { MikroORM } from '@mikro-orm/core';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
    entities: [List, User],
    dbName: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    driver: PostgreSqlDriver,
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
