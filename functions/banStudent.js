const fs = require("fs");

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);
  const bannedEmails = JSON.parse(fs.readFileSync("./db/banned.json", "utf-8"));

  if (!bannedEmails.includes(email)) {
    bannedEmails.push(email);
    fs.writeFileSync("./db/banned.json", JSON.stringify(bannedEmails, null, 2));
  }

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};