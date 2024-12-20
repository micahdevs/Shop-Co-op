/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListsQuery } from "@/generated/graphql";
import { LISTS_QUERY } from "@/graphql/queries/lists";
import { ListProps } from "@mantine/core";
import React from "react";
import { useQuery } from "urql";

interface ListsProps {}

export const Lists: React.FC<ListProps> = ({}) => {
	const [{ data }] = useQuery<ListsQuery>({ query: LISTS_QUERY });
	return (
		<>
			{!data ? null : data.lists.map((l) => <div key={l._id}>{l.title}</div>)}
		</>
	);
};
