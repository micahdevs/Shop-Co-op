"use client";
import { useMemo } from "react";
import {
	UrqlProvider,
	ssrExchange,
	cacheExchange,
	fetchExchange,
	createClient,
} from "@urql/next";
// import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

// MOVED METADATA EXPORT TO app/page.tsx
// export const metadata: Metadata = {
// 	title: "Shop Co-op",
// 	description: "NextJS + Mantine app",
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [client, ssr] = useMemo(() => {
		const ssr = ssrExchange({
			isClient: typeof window !== "undefined",
		});
		const client = createClient({
			url: "http://localhost:4000/graphql",
			exchanges: [cacheExchange, ssr, fetchExchange],
			suspense: true,
		});

		return [client, ssr];
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
