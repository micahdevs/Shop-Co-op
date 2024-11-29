/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { List, useListsQuery } from "@/generated/graphql";
import { ListProps } from "@mantine/core";
import React from "react";

interface ListsProps {}

export const Lists: React.FC<ListProps> = ({}) => {
	const [{ data }] = useListsQuery();
	return (
		<>
			{!data ? null : data.lists.map((l) => <div key={l._id}>{l.title}</div>)}
		</>
	);
};
