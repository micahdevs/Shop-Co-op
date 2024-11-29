import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type List = {
  __typename?: 'List';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createList: List;
  deleteList: Scalars['Boolean']['output'];
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
  updateList?: Maybe<List>;
};


export type MutationCreateListArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteListArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateListArgs = {
  id: Scalars['Float']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  list?: Maybe<List>;
  lists: Array<List>;
  me?: Maybe<User>;
};


export type QueryListArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RegUserFragment = { __typename?: 'User', _id: number, username: string };

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', _id: number, username: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', _id: number, username: string } | null } };

export type ListsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListsQuery = { __typename?: 'Query', lists: Array<{ __typename?: 'List', title: string, _id: string, createdAt?: string | null, updatedAt?: string | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: number, username: string } | null };

export const RegUserFragmentDoc = `
    fragment RegUser on User {
  _id
  username
}
    `;
export const LoginDocument = `
    mutation Login($options: UsernamePasswordInput!) {
  login(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegUser
    }
  }
}
    ${RegUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = `
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegUser
    }
  }
}
    ${RegUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ListsDocument = `
    query Lists {
  lists {
    title
    _id
    createdAt
    updatedAt
  }
}
    `;

export function useListsQuery(options?: Omit<Urql.UseQueryArgs<ListsQueryVariables>, 'query'>) {
  return Urql.useQuery<ListsQuery, ListsQueryVariables>({ query: ListsDocument, ...options });
};
export const MeDocument = `
    query Me {
  me {
    ...RegUser
  }
}
    ${RegUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};