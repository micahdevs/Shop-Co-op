import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "http://localhost:4000/graphql",
	documents: ["src/graphql/**/*.tsx"],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		"./src/generated/": {
			preset: "client",
			presetConfig: {
				gqlTagName: "gql",
			},
			config: {
				withHooks: true,
				documentMode: "string",
			},
		},
	},
};

export default config;
