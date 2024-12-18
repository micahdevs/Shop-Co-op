import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "http://localhost:4000/graphql",
	documents: ["src/graphql/**/*.ts"],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		"./src/generated/": {
			preset: "client",
		},
	},
	hooks: { afterAllFileWrite: ["prettier --write"] },
};

export default config;
