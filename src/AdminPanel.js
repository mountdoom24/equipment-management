import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [equipment, setEquipment] = useState([]);
  const [bannedEmails, setBannedEmails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/.netlify/functions/fetchData");
      const data = await response.json();
      setEquipment(data.equipment);
      setBannedEmails(data.bannedEmails);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Equipment List</h2>
      <ul>
        {equipment.map((item) => (
          <li key={item.id}>
            <p>Name: {item.name}</p>
            <p>Status: {item.status}</p>
            <p>Barcode: {item.barcode}</p>
          </li>
        ))}
      </ul>
      <h2>Banned Students</h2>
      <ul>
        {bannedEmails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;