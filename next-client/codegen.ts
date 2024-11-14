import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "http://localhost:4000/graphql",
	documents: ["src/graphql/**/*.ts"],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		"./src/generated/graphql.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-urql",
			],
			// preset: "client",
			presetConfig: {
				gqlTagName: "gql",
			},
			config: {
				withHooks: true,
				withComponent: false,
				withHOC: false,
				documentMode: "string",
			},
		},
	},
};

export default config;
