import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import congfigData from "../config.json";
import { loginStatusVar } from "./loginStatus";

const httpLink = new HttpLink({
  uri: congfigData.SERVER_URL,
  credentials: "include",
});
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ACCESS_JWT: loginStatusVar().accessToken || null,
    },
  }));
  return forward(operation);
});
export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
