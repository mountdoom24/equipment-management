import React, { useEffect, useState } from "react";

const TeacherDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/.netlify/functions/getUsers");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (email, newRole) => {
    const response = await fetch("/.netlify/functions/updateRole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newRole }),
    });

    const data = await response.json();
    alert(data.message);
    window.location.reload(); // Refresh the user list
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const response = await fetch("/.netlify/functions/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();
    alert(data.message);
    window.location.reload(); // Refresh the user list
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button onClick={() => handleRoleChange(user.email, "employee")}>
              Make Employee
            </button>
            <button onClick={() => handleRoleChange(user.email, "teacher")}>
              Make Teacher
            </button>
          </li>
        ))}
      </ul>
      <h2>Create New User</h2>
      <form onSubmit={handleCreateUser}>
        <label>
          Name:
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
        </label>
        <label>
          Role:
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="employee">Employee</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default TeacherDashboard;