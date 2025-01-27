import React, { useState } from "react";

const Form = () => {
  const [equipment, setEquipment] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch("/.netlify/functions/submitForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ equipment, dueDate, comments }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Form submitted successfully!");
    } else {
      alert("Error submitting form: " + data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Equipment Checkout Form</h1>
      <label>
        Equipment Requested:
        <input
          type="text"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          required
        />
      </label>
      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </label>
      <label>
        Additional Comments:
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;