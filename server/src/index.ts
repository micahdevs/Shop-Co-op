import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { List } from "./entities/List";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    const emFork = orm.em.fork(); 
    // fork the entity manager to avoid directly using global EntityManager (em) instance
    // additional option to use the RequestContext helper:
    // (https://mikro-orm.io/docs/identity-map#why-is-request-context-needed)

    const list = emFork.create(List, {title: 'Shopping List'} as List);
    await emFork.persistAndFlush(list);

    const lists = await emFork.find(List, {});
    console.log(lists);
};

main().catch((err) => {
    console.log(err);
});