import { makeVar } from "@apollo/client";
import { LOGIN_STATUS } from "../constants/constants";
import { SimpleMeQuery_me_user } from "../__generated__/SimpleMeQuery";

// login status

interface LoginStatus {
  isLoggedIn: boolean;
  accessToken?: string | null | undefined;
}

function getLoginStatusFromLocal(): LoginStatus {
  const status = localStorage.getItem(LOGIN_STATUS);
  if (!status)
    return {
      isLoggedIn: false,
      accessToken: null,
    };
  return JSON.parse(status);
}

function setLoginStatusToLocal(loginStatus: LoginStatus) {
  localStorage.setItem(LOGIN_STATUS, JSON.stringify(loginStatus));
  loginStatusVar(loginStatus);
}

function logout() {
  setLoginStatusToLocal({
    isLoggedIn: false,
    accessToken: null,
  });
  userObjectVar(null);
}

const userObjectVar = makeVar<SimpleMeQuery_me_user | null>(null);
const loginStatusVar = makeVar<LoginStatus>(getLoginStatusFromLocal());

export { loginStatusVar, setLoginStatusToLocal, userObjectVar, logout };
