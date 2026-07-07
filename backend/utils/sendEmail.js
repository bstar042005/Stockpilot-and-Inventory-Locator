const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StockPilot" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "StockPilot OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>StockPilot Account Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="color:#2563eb">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("EMAIL ERROR:");
    console.error(error);
    throw error;
  }
};

module.exports = sendOTP;