const fs = require("fs");

exports.handler = async (event) => {
  const forms = JSON.parse(fs.readFileSync("./db/forms.json", "utf-8"));
  const bannedEmails = JSON.parse(fs.readFileSync("./db/banned.json", "utf-8"));
  return {
    statusCode: 200,
    body: JSON.stringify({ forms, bannedEmails }),
  };
};