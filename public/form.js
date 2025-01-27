import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in to access the form.");
      navigate("/"); // Redirect to login
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/.netlify/functions/submitForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        equipment: "Camera", // Example, update as needed
        dueDate: "2025-02-01",
        comments: "No comments",
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Form submitted successfully!");
    } else {
      alert("Error submitting form: " + data.message);
    }
  };

  return (
    isLoggedIn && (
      <form onSubmit={handleSubmit}>
        <h1>Equipment Checkout Form</h1>
        <button type="submit">Submit Form</button>
      </form>
    )
  );
};

export default Form;