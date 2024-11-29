// MAKE A PLAIN AND SIMPLE NAVBAR TO TRY AND FIX THE DUPLICATE DATA/CONSTANT
// RERENDER/GRAPHQL NETWORK REQUESTS HAPPENING WITH USEMEQUERY() IN NAVBAR
"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mantine/core";
import Link from "next/link";
import { MeQuery, useLogoutMutation, useMeQuery } from "@/generated/graphql";
import { GetServerSideProps } from "next";

interface TestNavBarRerenderProps {}

const testNavProps = {
	bg: "var(--mantine-color-blue-light)",
	h: 50,
};

export const TestNavBarRerender: React.FC<TestNavBarRerenderProps> = ({}) => {
	const [, logout] = useLogoutMutation();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const [{ data, fetching }] = useMeQuery({
		pause: !isClient,
	});
	console.log("data: ", data);

	if (fetching) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Box {...testNavProps}>
				Hello Testnavbar, welcome {data?.me?.username}
			</Box>
			<Link
				onClick={() => {
					logout({}); // empty object passed as logout mutation doesn't take any variables
				}}
				href="/login"
			>
				Logout
			</Link>
		</>
	);
};
