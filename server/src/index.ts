import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
// import { buildSchema } from "type-graphql";
// import { HelloResolver } from "./resolvers/hello";
// import { ListResolver } from "./resolvers/list";
// import { UserResolver } from "./resolvers/user";
// import RedisStore from "connect-redis";
// import session from "express-session";
// import { Redis } from "ioredis";
// import { MyContext } from "./types";
import { resolvers } from "./example-schema/resolvers";
import { typeDefs } from "./example-schema/typeDefs";

interface ExampleContext {
	token?: String;
}

const main = async () => {
	const orm = await MikroORM.init(mikroConfig);
	await orm.getMigrator().up();
	// fork the entity manager to avoid directly using global EntityManager (em) instance
	// additional option to use the RequestContext helper:
	// (https://mikro-orm.io/docs/identity-map#why-is-request-context-needed)
	// const emFork = orm.em.fork();

	const app = express();
	const httpServer = http.createServer(app);

	// Initialize client.
	// let redisClient = new Redis();
	// redisClient.connect().catch(console.error);

	// Initialize store.
	// const redisStore = new RedisStore({
	// 	client: redisClient,
	// });

	// Initialize session storage.
	// app.use(
	// 	session({
	// 		store: redisStore,
	// 		resave: false, // required: force lightweight session keep alive (touch)
	// 		secret: "keyboard cat",
	// 		cookie: {
	// 			maxAge: 1000 * 60 * 60 * 24,
	// 			httpOnly: true,
	// 		},
	// 	}) as express.RequestHandler
	// );

	const apolloServer = new ApolloServer<ExampleContext>({
		resolvers: [resolvers],
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		typeDefs,
	});

	await apolloServer.start();
	app.use(
		"/graphql",
		cors<cors.CorsRequest>(),
		express.json(),
		expressMiddleware(apolloServer, {
			context: async ({ req }) => ({ token: req.headers.token }),
		})
	);

	app.listen(4000, () => {
		console.log("server started on localhost:4000");
	});
};

main().catch((err) => {
	console.log(err);
});
