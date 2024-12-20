import { ME_QUERY } from "@/graphql/queries/me";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "urql";

export const useIsAuth = () => {
	const [{ data, fetching }] = useQuery({query: ME_QUERY});
	const router = useRouter();
	useEffect(() => {
		if (!fetching && !data?.me) {
			router.replace("/login");
		}
	}, [fetching, data, router]);
};
