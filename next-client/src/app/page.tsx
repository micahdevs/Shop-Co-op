import type { Metadata } from "next";
import { NavBar } from "../app/components/NavBar/NavBar";
// import { TestHomeComponent } from "../app/test/TestHomeComponent";

export const metadata: Metadata = {
	title: "Shop Co-op",
	description: "NextJS + Mantine app",
};

export default function Home() {
	return (
		<>
			<NavBar />
		</>
	);
}
