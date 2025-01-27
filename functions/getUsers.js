const fs = require("fs");

exports.handler = async (event) => {
  const users = JSON.parse(fs.readFileSync("./db/users.json", "utf-8"));

  return {
    statusCode: 200,
    body: JSON.stringify(users), // Return all users with their roles
  };
};