import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/main/Loading";
import Wrapper from "./components/main/Wrapper";
import { useLoadUser } from "./hooks/useLoadUser";
import LoggedInRoutesPage from "./page/LoggedInRoutes";
import LoggedOutRoutesPage from "./page/LoggedOutRoutes";

function App() {
  const { isLoggedIn, loading } = useLoadUser();
  return (
    <div className="scroll-smooth">
      <Wrapper>
        {isLoggedIn && loading && <Loading />}
        {isLoggedIn && !loading && <LoggedInRoutesPage />}
        {!isLoggedIn && <LoggedOutRoutesPage />}
        {/* <CommonRoutes /> */}
      </Wrapper>
      <ToastContainer
        closeOnClick={true}
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
