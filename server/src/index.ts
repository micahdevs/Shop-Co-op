import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__, COOKIE_NAME } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { ListResolver } from "./resolvers/list";
import { UserResolver } from "./resolvers/user";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import { MyContext } from "./types";

const main = async () => {
	const orm = await MikroORM.init(mikroConfig);
	await orm.getMigrator().up();
	// fork the entity manager to avoid directly using global EntityManager (em) instance
	// additional option to use the RequestContext helper:
	// (https://mikro-orm.io/docs/identity-map#why-is-request-context-needed)
	const emFork = orm.em.fork();

	const app = express();
	const httpServer = http.createServer(app);

	// *Session storage code between express app initialization and expressMiddleware function*
	// Initialize client
	const redisClient = createClient();
	redisClient.connect().catch(console.error);

	// Initialize store
	const redisStore = new RedisStore({
		client: redisClient,
		prefix: "shopcoop",
		disableTouch: true,
	});

	// Initialize session storage
	app.use(
		session({
			name: COOKIE_NAME,
			store: redisStore,
			resave: false, // required: force lightweight session keep alive (touch)
			saveUninitialized: false, // recommended: only save session when data exists
			secret: "klsdfjalshdfhasdglh",
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 5, // 5 years
				httpOnly: true,
				sameSite: "lax", // csrf
				secure: __prod__, // cookie only works in https in __prod__
			},
		})
	);

	const schema = await buildSchema({
		resolvers: [HelloResolver, ListResolver, UserResolver],
	});

	const apolloServer = new ApolloServer<MyContext>({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await apolloServer.start();
	app.use(
		"/graphql",
		cors<cors.CorsRequest>({
			origin: "http://localhost:3000",
			credentials: true,
		}),
		express.json(),
		expressMiddleware(apolloServer, {
			context: async ({ req, res }): Promise<MyContext> => ({
				em: emFork,
				req,
				res,
			}),
		})
	);

	app.listen(4000, () => {
		console.log("server started on localhost:4000");
	});
};

main().catch((err) => {
	console.log(err);
});
