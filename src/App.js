import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Form from "./Form";
import TeacherDashboard from "./TeacherDashboard";
import Dashboard from "./Dashboard";

const App = () => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = isAuthenticated
    ? JSON.parse(atob(localStorage.getItem("token").split(".")[1])).role
    : null;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/form" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/form" />} />

        {/* Private Routes */}
        <Route
          path="/form"
          element={isAuthenticated ? <Form /> : <Navigate to="/" />}
        />
        <Route
          path="/teacher-dashboard"
          element={
            isAuthenticated && userRole === "teacher" ? <TeacherDashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated && userRole === "employee" ? <Dashboard /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;