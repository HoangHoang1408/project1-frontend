import { Navigate, Route, Routes } from "react-router-dom";
import DishDetailPage from "./customerRoutes/DishDetailPage";
import OrderHistoryDetailPage from "./customerRoutes/OrderHistoryDetailPage";
import OrderPage from "./customerRoutes/OrderPage";
import OrdersHistoryPage from "./customerRoutes/OrdersHistoryPage";
import RestaurantDetail from "./customerRoutes/RestaurantDetailPage";
import ShoppingPage from "./customerRoutes/ShoppingPage";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ShoppingPage />} />
      <Route path="/restaurant/:restaurantId" element={<RestaurantDetail />} />
      <Route path="/process-order" element={<OrderPage />} />
      <Route path="/orders-history" element={<OrdersHistoryPage />} />
      <Route path="/orders/:orderId" element={<OrderHistoryDetailPage />} />
      <Route path="/dishes/:dishSlug" element={<DishDetailPage />} />
      <Route path="*" element={<Navigate to={"/"} replace={true} />} />
    </Routes>
  );
};

export default CustomerRoutes;
