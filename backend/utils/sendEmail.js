const axios = require("axios");

const sendOTP = async (email, otp) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "StockPilot",
          email: "bstar042005@gmail.com",
        },
        to: [
          {
            email,
          },
        ],
        subject: "StockPilot OTP Verification",
        htmlContent: `
          <h2>StockPilot Account Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="color:#2563eb">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        `,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("OTP Email Sent");
    return true;
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err;
  }
};

module.exports = sendOTP;