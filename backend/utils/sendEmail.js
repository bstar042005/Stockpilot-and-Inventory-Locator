const SibApiV3Sdk = require("@getbrevo/brevo");

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendOTP = async (email, otp) => {
  try {
    await apiInstance.sendTransacEmail({
      sender: {
        email: "bstar042005@gmail.com",
        name: "StockPilot",
      },
      to: [
        {
          email: email,
        },
      ],
      subject: "StockPilot OTP Verification",
      htmlContent: `
        <h2>StockPilot Account Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="color:#2563eb">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    console.log("OTP Email Sent");
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = sendOTP;