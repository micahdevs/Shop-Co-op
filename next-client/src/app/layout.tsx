/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
	LoginMutation,
	LogoutMutation,
	MeDocument,
	MeQuery,
	RegisterMutation,
} from "@/generated/graphql";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import {
	UrqlProvider,
	createClient,
	fetchExchange,
	mapExchange,
	ssrExchange,
} from "@urql/next";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import "./globals.css";

function betterUpdateQuery<Result, Query>(
	cache: Cache,
	qi: QueryInput,
	result: any,
	fn: (r: Result, q: Query) => Query
) {
	return cache.updateQuery(qi, (data: any) => fn(result, data as any) as any);
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const [client, ssr] = useMemo(() => {
		const ssr = ssrExchange({
			isClient: typeof window !== "undefined",
		});
		const client = createClient({
			url: "http://localhost:4000/graphql",
			exchanges: [
				cacheExchange({
					updates: {
						Mutation: {
							logout: (_result, args, cache) => {
								betterUpdateQuery<LogoutMutation, MeQuery>(
									cache,
									{ query: MeDocument },
									_result,
									() => ({ me: null })
								);
							},
							login: (_result, args, cache) => {
								betterUpdateQuery<LoginMutation, MeQuery>(
									cache,
									{ query: MeDocument },
									_result,
									(result, query) => {
										if (result.login.errors) {
											return query;
										} else {
											return {
												me: result.login.user,
											};
										}
									}
								);
							},
							register: (_result, args, cache) => {
								betterUpdateQuery<RegisterMutation, MeQuery>(
									cache,
									{ query: MeDocument },
									_result,
									(result, query) => {
										if (result.register.errors) {
											return query;
										} else {
											return {
												me: result.register.user,
											};
										}
									}
								);
							},
						},
					},
				}),
				mapExchange({
					onError(error) {
						console.error(error);
						router.replace("/login");
					},
				}),
				ssr,
				fetchExchange,
			],
			suspense: true,
			fetchOptions: {
				credentials: "include", // to get cors error
			},
		});

		return [client, ssr];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<UrqlProvider client={client} ssr={ssr}>
					<MantineProvider>{children}</MantineProvider>
				</UrqlProvider>
			</body>
		</html>
	);
}
