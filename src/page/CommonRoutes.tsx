import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./something/NotFound";

function CommonRoutes() {
  return (
    <Routes>
      <Route path={"/notfound"} element={<NotFound />} />
      <Route path="*" element={<Navigate to={"/notfound"} replace={true} />} />
    </Routes>
  );
}

export default CommonRoutes;
