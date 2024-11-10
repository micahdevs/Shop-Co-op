"use client";
import React, { useState } from "react";
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
import { useQuery } from "urql";
import { ME_QUERY } from "@/graphql/queries/me";
import { Query } from "@/generated/graphql";

interface NavBarProps {}

const linkData = [
	{ link: "", label: "Account", icon: IconUserCircle },
	{ link: "", label: "Settings", icon: IconSettings },
	{ link: "", label: "Login", icon: IconLogin2 },
	{ link: "", label: "Register", icon: IconUserCheck },
];

// create a filtered links list for only the "login" and "register" icons as options if a user IS NOT LOGGED IN
const filteredLinkData = linkData.filter(
	(item) => item.label === "Login" || item.label === "Register"
);

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [active, setActive] = useState("Billing");

	const links = linkData.map((item) => (
		<a
			className={classes.link}
			data-active={item.label === active || undefined}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				event.preventDefault();
				setActive(item.label);
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</a>
	));

	const filteredLinks = filteredLinkData.map((item) => (
		<a
			className={classes.link}
			data-active={item.label === active || undefined}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				event.preventDefault();
				setActive(item.label);
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</a>
	));

	const [result] = useQuery({ query: ME_QUERY });
	const { data, fetching } = result;
	// errors with useQuery...
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
					{filteredLinks}
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
					{links}
				</div>

				<div className={classes.footer}>
					<Link href="/login" className={classes.link}>
						<IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
						<span>Change account</span>
					</Link>

					<Link href="/login" className={classes.link}>
						<IconLogout className={classes.linkIcon} stroke={1.5} />
						<span>Logout</span>
					</Link>
				</div>
			</nav>
		);
	}

	return <div>{body}</div>;
};
