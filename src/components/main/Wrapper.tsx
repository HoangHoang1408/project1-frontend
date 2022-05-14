import { useReactiveVar } from "@apollo/client";
import { FC } from "react";
import { loginStatusVar } from "../../apollo/reactiveVar/loginStatus";
import Footer from "./Footer";
import Header from "./Header";
import PartialHeader from "./PartialHeader";

export const Wrapper: FC = ({ children }) => {
  const { isLoggedIn } = useReactiveVar(loginStatusVar);
  return (
    <div className="flex flex-col min-h-screen justify-between">
      {isLoggedIn && <Header />}
      {!isLoggedIn && <PartialHeader />}
      {children}
      <Footer />
    </div>
  );
};

export default Wrapper;
