import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [forms, setForms] = useState([]);
  const [bannedEmails, setBannedEmails] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      const response = await fetch("/.netlify/functions/fetchData");
      const data = await response.json();
      setForms(data.forms);
      setBannedEmails(data.bannedEmails);
    };

    fetchAdminData();
  }, []);

  const banStudent = async (email) => {
    await fetch("/.netlify/functions/banStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setBannedEmails([...bannedEmails, email]);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Banned Students</h2>
      <ul>
        {bannedEmails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
      <h2>Pending Requests</h2>
      <ul>
        {forms
          .filter((form) => form.status === "Pending")
          .map((form) => (
            <li key={form.id}>
              <p>Student: {form.studentEmail}</p>
              <p>Equipment: {form.equipment.join(", ")}</p>
              <button
                onClick={async () => {
                  await fetch("/.netlify/functions/submitForm", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ formId: form.id, action: "approve" }),
                  });
                  setForms(forms.filter((f) => f.id !== form.id));
                }}
              >
                Approve
              </button>
              <button
                onClick={async () => {
                  await fetch("/.netlify/functions/submitForm", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ formId: form.id, action: "deny" }),
                  });
                  setForms(forms.filter((f) => f.id !== form.id));
                }}
              >
                Deny
              </button>
              <button onClick={() => banStudent(form.studentEmail)}>
                Ban Student
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AdminPanel;