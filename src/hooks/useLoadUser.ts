import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import {
  loginStatusVar,
  setLoginStatusToLocal,
  userObjectVar,
} from "../apollo/reactiveVar/loginStatus";
import { SimpleMeQuery } from "../__generated__/SimpleMeQuery";
import { USER_OBJECT_QUERY } from "../apollo/query/userObjectQuery";

// old version :))
// async function refreshToken() {
//   try {
//     const {
//       data: { accessToken },
//     } = await axios.get(config.REFRESH_TOKENS_URL, {
//       withCredentials: true,
//     });
//     loginStatusVar({
//       isLoggedIn: true,
//       accessToken,
//     });
//   } catch (err) {
//     throw err;
//   }
// }
// export const useLoadUser = (): { isLoggedIn: boolean; loading: boolean } => {
//   const { isLoggedIn } = useReactiveVar(loginStatusVar);
//   const userObject = useReactiveVar(userObjectVar);
//   const [loading, setLoading] = useState(false);
//   const [userObjectQuery] = useLazyQuery<SimpleMeQuery>(USER_OBJECT_QUERY);

//   useEffect(() => {
//     async function refreshTokenAndGetUserObject() {
//       setLoading(true);
//       try {
//         await refreshToken();
//         const { data, error } = await userObjectQuery();
//         if (data) {
//           const {
//             me: { user: newUserObject },
//           } = data;
//           userObjectVar(newUserObject);
//         }
//         if (error || data?.me.error?.message) throw new Error();
//       } catch (err) {
//         loginStatusVar({
//           isLoggedIn: false,
//           accessToken: null,
//         });
//       }
//       setLoading(false);
//     }
//     if (isLoggedIn && !userObject?.id) refreshTokenAndGetUserObject();
//     let timer: NodeJS.Timer;
//     if (isLoggedIn && userObject?.id) {
//       timer = setInterval(() => {
//         refreshToken();
//       }, +config.REFRESH_TIME);
//     }
//     return () => {
//       clearInterval(timer);
//     };
//   }, [userObjectQuery, userObject?.id, isLoggedIn]);
//   return { loading, isLoggedIn };
// };

export const useLoadUser = () => {
  const { isLoggedIn } = useReactiveVar(loginStatusVar);
  const userObject = useReactiveVar(userObjectVar);
  const [userObjectQuery, { loading }] =
    useLazyQuery<SimpleMeQuery>(USER_OBJECT_QUERY);
  useEffect(() => {
    if (isLoggedIn && !userObject) {
      userObjectQuery()
        .then(({ data }) => {
          if (!data || data.me.error)
            return setLoginStatusToLocal({
              isLoggedIn: false,
              accessToken: null,
            });
          userObjectVar(data.me.user);
        })
        .catch(() => {
          setLoginStatusToLocal({
            isLoggedIn: false,
            accessToken: null,
          });
        });
    }
  }, [isLoggedIn, userObject, userObjectQuery]);
  return { loading, isLoggedIn };
};
