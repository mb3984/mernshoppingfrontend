import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("jwt_token");
  const userRole = localStorage.getItem("userRole");

  // 1. If not logged in, send to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. If route is Admin-only but user is not an admin, send to user dashboard
  if (adminOnly && userRole !== "admin") {
    return <Navigate to="/user-dashboard" replace />;
  }

  // 3. If route is for Users but an Admin tries to access it (Optional)
  // Usually, admins can see user pages, but you can restrict it if needed.

  // Support both wrapper style: <ProtectedRoute><Component /></ProtectedRoute>
  // and Layout style: <Route element={<ProtectedRoute />}><Route ... /></Route>
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
