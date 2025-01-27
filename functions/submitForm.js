const fs = require("fs");

exports.handler = async (event) => {
  const { equipment, dueDate, comments } = JSON.parse(event.body);
  const token = event.headers.authorization?.split(" ")[1];

  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: "Unauthorized" }),
    };
  }

  // Decode token (for demo, skipping validation)
  const forms = JSON.parse(fs.readFileSync("./db/forms.json", "utf-8"));

  const newForm = {
    id: forms.length + 1,
    equipment,
    dueDate,
    comments,
    status: "Pending",
    submittedAt: new Date().toISOString(),
  };

  forms.push(newForm);
  fs.writeFileSync("./db/forms.json", JSON.stringify(forms, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: "Form submitted successfully!" }),
  };
};