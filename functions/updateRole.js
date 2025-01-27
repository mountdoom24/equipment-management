const fs = require("fs");

exports.handler = async (event) => {
  const { email, newRole } = JSON.parse(event.body);
  const users = JSON.parse(fs.readFileSync("./db/users.json", "utf-8"));

  const user = users.find((u) => u.email === email);
  if (!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({ success: false, message: "User not found" }),
    };
  }

  user.role = newRole;
  fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: `User role updated to ${newRole}` }),
  };
};