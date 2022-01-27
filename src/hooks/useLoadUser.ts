import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { loginStatusVar, userObjectVar } from "../apollo/loginStatus";
import config from "../config.json";
import { SIMPLE_USER_FRAGMENT } from "./../constants/fragment/SimpleUserFragment";
import { SimpleMeQuery } from "./../__generated__/SimpleMeQuery";

async function refreshToken() {
  try {
    const {
      data: { accessToken },
    } = await axios.get(config.REFRESH_TOKENS_URL, {
      withCredentials: true,
    });
    loginStatusVar({
      isLoggedIn: true,
      accessToken,
    });
  } catch (err) {
    throw err;
  }
}

export const useLoadUser = (): { isLoggedIn: boolean; loading: boolean } => {
  const { isLoggedIn } = useReactiveVar(loginStatusVar);
  const userObject = useReactiveVar(userObjectVar);
  const [loading, setLoading] = useState(false);
  const [userObjectQuery] = useLazyQuery<SimpleMeQuery>(USER_OBJECT_QUERY);

  useEffect(() => {
    async function refreshTokenAndGetUserObject() {
      setLoading(true);
      try {
        await refreshToken();
        const { data, error } = await userObjectQuery();
        if (data) {
          const {
            me: { user: newUserObject },
          } = data;
          userObjectVar(newUserObject);
        }
        if (error || data?.me.error?.message) throw new Error();
      } catch (err) {
        loginStatusVar({
          isLoggedIn: false,
          accessToken: null,
        });
      }
      setLoading(false);
    }
    if (isLoggedIn && !userObject?.id) refreshTokenAndGetUserObject();
    let timer: NodeJS.Timer;
    if (isLoggedIn && userObject?.id) {
      timer = setInterval(() => {
        refreshToken();
      }, +config.REFRESH_TIME);
    }
    return () => {
      clearInterval(timer);
    };
  }, [userObjectQuery, userObject?.id, isLoggedIn]);
  return { loading, isLoggedIn };
};
const USER_OBJECT_QUERY = gql`
  ${SIMPLE_USER_FRAGMENT}
  query SimpleMeQuery {
    me {
      ok
      error {
        message
      }
      user {
        ...SimpleUser
      }
    }
  }
`;
