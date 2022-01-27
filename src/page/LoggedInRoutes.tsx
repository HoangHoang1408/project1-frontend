import { userObjectVar } from "../apollo/loginStatus";
import Loading from "../components/main/Loading";
import { UserRole } from "../__generated__/globalTypes";
import CustomerRoutes from "./loggedInRoutes/CustomerRoutes";
import DriverRoutes from "./loggedInRoutes/DriverRoutes";
import OwnerRoutes from "./loggedInRoutes/OwnerRoutes";

const LoggedInRoutesPage = () => {
  const user = userObjectVar();
  if (!user) return <Loading />;
  switch (user.role) {
    case UserRole.Customer:
      return <CustomerRoutes />;
    case UserRole.Driver:
      return <DriverRoutes />;
    case UserRole.Owner:
      return <OwnerRoutes />;
  }
  return <Loading></Loading>;
};

export default LoggedInRoutesPage;
