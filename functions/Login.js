const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body);
  const users = JSON.parse(fs.readFileSync("./db/users.json", "utf-8"));

  // Find the user by email
  const user = users.find((u) => u.email === email);
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ success: false, message: "User not found" }) };
  }

  // Verify password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return { statusCode: 401, body: JSON.stringify({ success: false, message: "Invalid password" }) };
  }

  // Generate a JWT with the user's role
  const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, token, role: user.role }),
  };
};