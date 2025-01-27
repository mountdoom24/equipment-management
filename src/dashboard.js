import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must log in to access the dashboard.");
      navigate("/"); // Redirect to login
    } else {
      const userRole = JSON.parse(atob(token.split(".")[1])).role; // Decode JWT to get role
      setRole(userRole);
    }
  }, [navigate]);

  if (role === "student") {
    return <h1>Access Denied: Students cannot view dashboards.</h1>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {role === "employee" && <p>Welcome to the Employee Dashboard.</p>}
      {role === "teacher" && <p>Welcome to the Teacher Dashboard.</p>}
    </div>
  );
};

export default Dashboard;