const admin = require("firebase-admin");
const axios = require("axios");

const { onCall } = require("firebase-functions/v2/https");

admin.initializeApp();

exports.sendMessages = onCall((request) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  const data = {
    model: "gpt-3.5-turbo",
    messages: request.data.messages,
  };

  return axios
    .post("https://api.openai.com/v1/chat/completions", data, { headers })
    .then((response) => {
      return { status: 200, message: response.data.choices[0].message.content };
    })
    .catch((error) => {
      const errorMessage = error.response
        ? error.response.data.error.message
        : "Error occurred while making the API call";
      return {
        status: error.response ? error.response.status : 500,
        message: errorMessage,
      };
    });
});
