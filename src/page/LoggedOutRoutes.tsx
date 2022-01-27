import { Route, Routes } from "react-router-dom";
import Footer from "../components/main/Footer";
import PartialHeader from "../components/main/PartialHeader";
import ForgotPassword from "./loggedOutRoutes/ForgotPassword";
import LoginPage from "./loggedOutRoutes/LoginPage";
import SignUpPage from "./loggedOutRoutes/SignUpPage";

function LoggedOutRoutesPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <PartialHeader></PartialHeader>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default LoggedOutRoutesPage;
