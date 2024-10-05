import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { List } from "./entities/List";
import mikroConfig from "./mikro-orm.config";
import express from 'express';
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { Application } from "../node_modules/apollo-server-express/node_modules/@types/express/index"

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();
    // fork the entity manager to avoid directly using global EntityManager (em) instance
    // additional option to use the RequestContext helper:
    // (https://mikro-orm.io/docs/identity-map#why-is-request-context-needed)

    const app = express() as Application;

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        })
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })


};

main().catch((err) => {
    console.log(err);
});