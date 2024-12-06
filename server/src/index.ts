import "reflect-metadata";
import { __prod__, COOKIE_NAME } from "./constants";
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
import Redis from "ioredis";
import { MyContext } from "./types";
import { appDataSource } from "./utils/dataSourceTypeORM";

const main = async () => {
	appDataSource.initialize(); // consider using ".then()" to do stuff after initialization (wrapper)
	const app = express();
	const httpServer = http.createServer(app);

	// *Session storage code between express app initialization and expressMiddleware function*
	// Initialize client
	const redis = Redis.createClient();
	redis.connect().catch(console.error);

	// Initialize store
	const redisStore = new RedisStore({
		client: redis,
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
		validate: false,
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
				req,
				res,
				redis,
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
