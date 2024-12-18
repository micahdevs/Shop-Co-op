"use client";
import React, { useState, useEffect } from "react";
import { Group, Code, Paper } from "@mantine/core";
import {
	IconUserCircle,
	IconSettings,
	IconSwitchHorizontal,
	IconLogout,
	IconLogin2,
	IconUserCheck,
} from "@tabler/icons-react";
import classes from "./NavBar.module.css";
import Link from "next/link";
import { LOGIN_MUT } from "@/graphql/mutations/login";
import { ME_QUERY } from "@/graphql/queries/me";
import { useMutation, useQuery } from "urql";

interface NavBarProps {}

const loggedInLinkData = [
	{ link: "", label: "Account", icon: IconUserCircle },
	{ link: "", label: "Settings", icon: IconSettings },
];

const loggedOutLinkData = [
	{ link: "http://localhost:3000/login", label: "Login", icon: IconLogin2 },
	{
		link: "http://localhost:3000/register",
		label: "Register",
		icon: IconUserCheck,
	},
];

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [, logout] = useMutation(LOGIN_MUT);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const [{ data, fetching }] = useQuery({
		query: ME_QUERY,
		pause: !isClient,
	});

	console.log("data: ", data);

	const loggedInLinks = loggedInLinkData.map((item) => (
		<a
			className={classes.link}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				event.preventDefault();
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</a>
	));

	const loggedOutLinks = loggedOutLinkData.map((item) => (
		<a
			className={classes.link}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				event.preventDefault();
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</a>
	));

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
					{loggedOutLinks}
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
					{loggedInLinks}
				</div>

				<div className={classes.footer}>
					<Link href="/login" className={classes.link}>
						<IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
						<span>Change account</span>
					</Link>

					<Link
						onClick={() => {
							logout({}); // empty object passed as logout mutation doesn't take any variables
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
