import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/.netlify/functions/fetchData", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setForms(data.forms);
      setLoading(false);
    };

    fetchForms();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {forms.map((form) => (
            <li key={form.id}>
              <p>Equipment: {form.equipment.join(", ")}</p>
              <p>Status: {form.status}</p>
              <p>Due Date: {form.dueDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;