const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body);
  const users = JSON.parse(fs.readFileSync("./db/users.json", "utf-8"));

  const user = users.find((u) => u.email === email);
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ success: false, message: "User not found" }) };
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return { statusCode: 401, body: JSON.stringify({ success: false, message: "Invalid password" }) };
  }

  const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "1h" });
  return { statusCode: 200, body: JSON.stringify({ success: true, token }) };
};