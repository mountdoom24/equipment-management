import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;
  
  const userRole = JSON.parse(atob(token.split(".")[1])).role;
  return userRole === role ? children : <Navigate to="/" />;
};

export default ProtectedRoute;