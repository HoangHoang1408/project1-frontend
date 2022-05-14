import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import axios from "axios";
import jwtDecode from "jwt-decode";
import config from "../config.json";
import {
  loginStatusVar,
  setLoginStatusToLocal,
} from "./reactiveVar/loginStatus";

interface JwtDecodedObject {
  userId: number;
  exp: number;
  iat: number;
}
const httpLink = new HttpLink({
  uri: config.SERVER_URL,
  credentials: "include",
});
let pendingGetAccessTokenRequest: Promise<string | null> | null;
const getRefreshedToken = async (): Promise<string | null> => {
  try {
    const {
      data: { accessToken },
    } = await axios.get(config.REFRESH_TOKENS_URL, {
      withCredentials: true,
    });
    setLoginStatusToLocal({
      isLoggedIn: true,
      accessToken,
    });
    pendingGetAccessTokenRequest = null;
    return accessToken;
  } catch (e) {
    setLoginStatusToLocal({
      isLoggedIn: false,
      accessToken: null,
    });
    return null;
  }
};
const getAccessToken = async (): Promise<string | null> => {
  const oldAccessToken = loginStatusVar().accessToken;
  if (!oldAccessToken) return null;
  const { exp } = jwtDecode<JwtDecodedObject>(oldAccessToken);
  if (exp > Date.now() / 1000 + 1.2) return oldAccessToken;
  if (!pendingGetAccessTokenRequest)
    pendingGetAccessTokenRequest = getRefreshedToken();
  return pendingGetAccessTokenRequest;
};
const headersTokenLink = setContext(async (_, { headers = {} }) => {
  const accessToken = await getAccessToken();
  return {
    headers: {
      ...headers,
      ACCESS_JWT: accessToken,
    },
  };
});
// const authMiddleware = new ApolloLink((operation, forward) => {
//   operation.setContext(({ headers = {} }) => {
//     // const accessToken = await getAccessToken();
//     return {
//       headers: {
//         ...headers,
//         ACCESS_JWT: loginStatusVar().accessToken,
//       },
//     };
//   });
//   return forward(operation);
// });
export const client = new ApolloClient({
  link: from([headersTokenLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
