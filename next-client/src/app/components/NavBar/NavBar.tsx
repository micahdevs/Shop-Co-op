"use client";
import { LOGOUT_MUT } from "@/graphql/mutations/logout";
import { ME_QUERY } from "@/graphql/queries/me";
import { Code, Group, Paper } from "@mantine/core";
import {
	IconLogout,
	IconNote,
	IconSwitchHorizontal,
	IconLogin,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import classes from "./NavBar.module.css";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [, logout] = useMutation(LOGOUT_MUT);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const [{ data, fetching }] = useQuery({
		query: ME_QUERY,
		pause: !isClient,
	});

	let body = null;
	if (fetching) {
		// data is loading
		body = null;
	} else if (!data?.me) {
		// user is not logged in
		body = (
			<nav className={classes.navbar}>
				<div className={classes.navbarMain}>
					<Group className={classes.header} justify="space-between">
						Shop Co-op Home
						<Code fw={700}>v0.0.0</Code>
					</Group>
					<Link href="/login" className={classes.link}>
						<IconLogin className={classes.linkIcon} stroke={1.5} />
						<span>Please Log In!!!</span>
					</Link>
				</div>
			</nav>
		);
	} else {
		// user is logged in
		body = (
			<nav className={classes.navbar}>
				<div className={classes.navbarMain}>
					<Group className={classes.header} justify="space-between">
						Shop Co-op Home
						<Code fw={700}>v0.0.0</Code>
					</Group>
					<Paper>{data.me.username}</Paper>
					<Link href="/create-list" className={classes.link}>
						<IconNote className={classes.linkIcon} stroke={1.5} />
						<span>Create List</span>
					</Link>
				</div>

				<div className={classes.footer}>
					<Link href="/login" className={classes.link}>
						<IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
						<span>Change account</span>
					</Link>

					<Link
						onClick={() => {
							logout({});
						}}
						href="/login"
						className={classes.link}
					>
						<IconLogout className={classes.linkIcon} stroke={1.5} />
						<span>Logout</span>
					</Link>
				</div>
			</nav>
		);
	}

	return <div>{body}</div>;
};
