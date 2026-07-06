const nodemailer = require("nodemailer");
const dns = require("dns");

const sendOTP = async (email, otp) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

    // Prefer IPv4 over IPv6
    dns.setDefaultResultOrder("ipv4first");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },

      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log("✅ SMTP VERIFIED");

    const info = await transporter.sendMail({
      from: `"StockPilot" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "StockPilot OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>StockPilot Account Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="color:#2563eb;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("✅ Email Sent:", info.messageId);

    return true;

  } catch (error) {
    console.error("❌ EMAIL ERROR");
    console.error(error);
    throw error;
  }
};

module.exports = sendOTP;