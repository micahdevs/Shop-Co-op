/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  "\n\tfragment RegError on FieldError {\n\t\tfield\n\t\tmessage\n\t}\n":
    types.RegErrorFragmentDoc,
  "\n\tfragment RegUser on User {\n\t\t_id\n\t\tusername\n\t\temail\n\t}\n":
    types.RegUserFragmentDoc,
  "\n\tfragment RegUserResponse on UserResponse {\n\t\terrors {\n\t\t\t...RegError\n\t\t}\n\t\tuser {\n\t\t\t...RegUser\n\t\t}\n\t}\n":
    types.RegUserResponseFragmentDoc,
  "\n\tmutation ChangePassword($token: String!, $newPassword: String!) {\n\t\tchangePassword(token: $token, newPassword: $newPassword) {\n\t\t\terrors {\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t}\n\t}\n":
    types.ChangePasswordDocument,
  "\n\tmutation CreateList($input: ListInput!) {\n\t\tcreateList(input: $input) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tcreatorId\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n":
    types.CreateListDocument,
  "\n\tmutation ForgotPassword($email: String!) {\n\t\tforgotPassword(email: $email)\n\t}\n":
    types.ForgotPasswordDocument,
  "\n\tmutation Login($usernameOrEmail: String!, $password: String!) {\n\t\tlogin(usernameOrEmail: $usernameOrEmail, password: $password) {\n\t\t\terrors {\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t}\n\t}\n":
    types.LoginDocument,
  "\n\tmutation Logout {\n\t\tlogout\n\t}\n": types.LogoutDocument,
  "\n\tmutation Register($options: UsernamePasswordInput!) {\n\t\tregister(options: $options) {\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t\terrors {\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n":
    types.RegisterDocument,
  "\n\tquery Lists {\n\t\tlists {\n\t\t\ttitle\n\t\t\t_id\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n":
    types.ListsDocument,
  "\n\tquery Me {\n\t\tme {\n\t\t\t_id\n\t\t\tusername\n\t\t\temail\n\t\t}\n\t}\n":
    types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tfragment RegError on FieldError {\n\t\tfield\n\t\tmessage\n\t}\n",
): (typeof documents)["\n\tfragment RegError on FieldError {\n\t\tfield\n\t\tmessage\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tfragment RegUser on User {\n\t\t_id\n\t\tusername\n\t\temail\n\t}\n",
): (typeof documents)["\n\tfragment RegUser on User {\n\t\t_id\n\t\tusername\n\t\temail\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tfragment RegUserResponse on UserResponse {\n\t\terrors {\n\t\t\t...RegError\n\t\t}\n\t\tuser {\n\t\t\t...RegUser\n\t\t}\n\t}\n",
): (typeof documents)["\n\tfragment RegUserResponse on UserResponse {\n\t\terrors {\n\t\t\t...RegError\n\t\t}\n\t\tuser {\n\t\t\t...RegUser\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tmutation ChangePassword($token: String!, $newPassword: String!) {\n\t\tchangePassword(token: $token, newPassword: $newPassword) {\n\t\t\terrors {\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t}\n\t}\n",
): (typeof documents)["\n\tmutation ChangePassword($token: String!, $newPassword: String!) {\n\t\tchangePassword(token: $token, newPassword: $newPassword) {\n\t\t\terrors {\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tmutation CreateList($input: ListInput!) {\n\t\tcreateList(input: $input) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tcreatorId\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n",
): (typeof documents)["\n\tmutation CreateList($input: ListInput!) {\n\t\tcreateList(input: $input) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tcreatorId\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tmutation ForgotPassword($email: String!) {\n\t\tforgotPassword(email: $email)\n\t}\n",
): (typeof documents)["\n\tmutation ForgotPassword($email: String!) {\n\t\tforgotPassword(email: $email)\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tmutation Login($usernameOrEmail: String!, $password: String!) {\n\t\tlogin(usernameOrEmail: $usernameOrEmail, password: $password) {\n\t\t\terrors {\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t}\n\t}\n",
): (typeof documents)["\n\tmutation Login($usernameOrEmail: String!, $password: String!) {\n\t\tlogin(usernameOrEmail: $usernameOrEmail, password: $password) {\n\t\t\terrors {\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tmutation Logout {\n\t\tlogout\n\t}\n",
): (typeof documents)["\n\tmutation Logout {\n\t\tlogout\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tmutation Register($options: UsernamePasswordInput!) {\n\t\tregister(options: $options) {\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t\terrors {\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n",
): (typeof documents)["\n\tmutation Register($options: UsernamePasswordInput!) {\n\t\tregister(options: $options) {\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t\terrors {\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tquery Lists {\n\t\tlists {\n\t\t\ttitle\n\t\t\t_id\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n",
): (typeof documents)["\n\tquery Lists {\n\t\tlists {\n\t\t\ttitle\n\t\t\t_id\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tquery Me {\n\t\tme {\n\t\t\t_id\n\t\t\tusername\n\t\t\temail\n\t\t}\n\t}\n",
): (typeof documents)["\n\tquery Me {\n\t\tme {\n\t\t\t_id\n\t\t\tusername\n\t\t\temail\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
