const fs = require("fs");
const bcrypt = require("bcryptjs");

exports.handler = async (event) => {
  const { name, email, password } = JSON.parse(event.body);
  const users = JSON.parse(fs.readFileSync("./db/users.json", "utf-8"));

  if (users.some((u) => u.email === email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "User already exists" }),
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword, role: "student" });
  fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 2));

  return {
    statusCode: 201,
    body: JSON.stringify({ success: true, message: "User registered successfully" }),
  };
};