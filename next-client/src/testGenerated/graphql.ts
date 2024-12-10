/* eslint-disable */
import { DocumentTypeDecoration } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
};

export type List = {
  __typename?: "List";
  _id: Scalars["ID"]["output"];
  createdAt: Scalars["String"]["output"];
  creatorId: Scalars["Float"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
};

export type ListInput = {
  text: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: UserResponse;
  createList: List;
  deleteList: Scalars["Boolean"]["output"];
  forgotPassword: Scalars["Boolean"]["output"];
  login: UserResponse;
  logout: Scalars["Boolean"]["output"];
  register: UserResponse;
  updateList?: Maybe<List>;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type MutationCreateListArgs = {
  input: ListInput;
};

export type MutationDeleteListArgs = {
  id: Scalars["Float"]["input"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  password: Scalars["String"]["input"];
  usernameOrEmail: Scalars["String"]["input"];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationUpdateListArgs = {
  id: Scalars["Float"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"]["output"];
  list?: Maybe<List>;
  lists: Array<List>;
  me?: Maybe<User>;
};

export type QueryListArgs = {
  id: Scalars["Float"]["input"];
};

export type User = {
  __typename?: "User";
  _id: Scalars["Float"]["output"];
  createdAt: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type RegErrorFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
} & { " $fragmentName"?: "RegErrorFragment" };

export type RegUserFragment = {
  __typename?: "User";
  _id: number;
  username: string;
  email: string;
} & { " $fragmentName"?: "RegUserFragment" };

export type RegUserResponseFragment = {
  __typename?: "UserResponse";
  errors?: Array<
    { __typename?: "FieldError" } & {
      " $fragmentRefs"?: { RegErrorFragment: RegErrorFragment };
    }
  > | null;
  user?:
    | ({ __typename?: "User" } & {
        " $fragmentRefs"?: { RegUserFragment: RegUserFragment };
      })
    | null;
} & { " $fragmentName"?: "RegUserResponseFragment" };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: {
    __typename?: "UserResponse";
    errors?: Array<
      { __typename?: "FieldError" } & {
        " $fragmentRefs"?: { RegErrorFragment: RegErrorFragment };
      }
    > | null;
    user?:
      | ({ __typename?: "User" } & {
          " $fragmentRefs"?: { RegUserFragment: RegUserFragment };
        })
      | null;
  };
};

export type CreateListMutationVariables = Exact<{
  input: ListInput;
}>;

export type CreateListMutation = {
  __typename?: "Mutation";
  createList: {
    __typename?: "List";
    _id: string;
    title: string;
    creatorId: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"]["input"];
}>;

export type ForgotPasswordMutation = {
  __typename?: "Mutation";
  forgotPassword: boolean;
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: { __typename?: "UserResponse" } & {
    " $fragmentRefs"?: { RegUserResponseFragment: RegUserResponseFragment };
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "UserResponse" } & {
    " $fragmentRefs"?: { RegUserResponseFragment: RegUserResponseFragment };
  };
};

export type ListsQueryVariables = Exact<{ [key: string]: never }>;

export type ListsQuery = {
  __typename?: "Query";
  lists: Array<{
    __typename?: "List";
    title: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?:
    | ({ __typename?: "User" } & {
        " $fragmentRefs"?: { RegUserFragment: RegUserFragment };
      })
    | null;
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>["__apiType"];

  constructor(
    private value: string,
    public __meta__?: Record<string, any> | undefined,
  ) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const RegErrorFragmentDoc = new TypedDocumentString(
  `
    fragment RegError on FieldError {
  field
  message
}
    `,
  { fragmentName: "RegError" },
) as unknown as TypedDocumentString<RegErrorFragment, unknown>;
export const RegUserFragmentDoc = new TypedDocumentString(
  `
    fragment RegUser on User {
  _id
  username
  email
}
    `,
  { fragmentName: "RegUser" },
) as unknown as TypedDocumentString<RegUserFragment, unknown>;
export const RegUserResponseFragmentDoc = new TypedDocumentString(
  `
    fragment RegUserResponse on UserResponse {
  errors {
    ...RegError
  }
  user {
    ...RegUser
  }
}
    fragment RegError on FieldError {
  field
  message
}
fragment RegUser on User {
  _id
  username
  email
}`,
  { fragmentName: "RegUserResponse" },
) as unknown as TypedDocumentString<RegUserResponseFragment, unknown>;
export const ChangePasswordDocument = new TypedDocumentString(`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      ...RegError
    }
    user {
      ...RegUser
    }
  }
}
    fragment RegError on FieldError {
  field
  message
}
fragment RegUser on User {
  _id
  username
  email
}`) as unknown as TypedDocumentString<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const CreateListDocument = new TypedDocumentString(`
    mutation CreateList($input: ListInput!) {
  createList(input: $input) {
    _id
    title
    creatorId
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<
  CreateListMutation,
  CreateListMutationVariables
>;
export const ForgotPasswordDocument = new TypedDocumentString(`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `) as unknown as TypedDocumentString<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LoginDocument = new TypedDocumentString(`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegUserResponse
  }
}
    fragment RegError on FieldError {
  field
  message
}
fragment RegUser on User {
  _id
  username
  email
}
fragment RegUserResponse on UserResponse {
  errors {
    ...RegError
  }
  user {
    ...RegUser
  }
}`) as unknown as TypedDocumentString<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = new TypedDocumentString(`
    mutation Logout {
  logout
}
    `) as unknown as TypedDocumentString<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = new TypedDocumentString(`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegUserResponse
  }
}
    fragment RegError on FieldError {
  field
  message
}
fragment RegUser on User {
  _id
  username
  email
}
fragment RegUserResponse on UserResponse {
  errors {
    ...RegError
  }
  user {
    ...RegUser
  }
}`) as unknown as TypedDocumentString<
  RegisterMutation,
  RegisterMutationVariables
>;
export const ListsDocument = new TypedDocumentString(`
    query Lists {
  lists {
    title
    _id
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<ListsQuery, ListsQueryVariables>;
export const MeDocument = new TypedDocumentString(`
    query Me {
  me {
    ...RegUser
  }
}
    fragment RegUser on User {
  _id
  username
  email
}`) as unknown as TypedDocumentString<MeQuery, MeQueryVariables>;
