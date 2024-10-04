import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { List } from "./entities/List";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    const list = orm.em.create(List, {title: 'Shopping List'} as List);
    await orm.em.persistAndFlush(list);

};

main().catch((err) => {
    console.log(err);
});