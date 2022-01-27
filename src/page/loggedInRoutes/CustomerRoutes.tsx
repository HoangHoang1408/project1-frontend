import React from "react";
import { Route, Routes } from "react-router-dom";
import OrderPage from "./customerRoutes/CartPage";
import RestaurantDetail from "./customerRoutes/RestaurantDetailPage";
import ShoppingPage from "./customerRoutes/ShoppingPage";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ShoppingPage />} />
      <Route path="/restaurant/:restaurantId" element={<RestaurantDetail />} />
      <Route path="/order" element={<OrderPage />} />
    </Routes>
  );
};

export default CustomerRoutes;
