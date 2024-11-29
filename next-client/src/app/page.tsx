import type { Metadata } from "next";
import { NavBar } from "../app/components/NavBar/NavBar";
import { Suspense } from "react";
// import { Lists } from "./components/Lists/Lists";
// import { TestNavBarRerender } from "./test/TestNavBarRerender";
// import { TestHomeComponent } from "../app/test/TestHomeComponent";

export const metadata: Metadata = {
	title: "Shop Co-op",
	description: "NextJS + Mantine app",
};

export default function Home() {
	return (
		<>
			<Suspense>
				<NavBar />
			</Suspense>
		</>
	);
}
