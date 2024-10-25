import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "http://localhost:4000/graphql",
	documents: ["src/graphql/**/*.tsx"],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		"./src/generated/": {
			preset: "client",
			config: {
				withHooks: true,
				documentMode: "string",
			},
		},
	},
	hooks: { afterAllFileWrite: ["prettier --write"] },
};

export default config;
