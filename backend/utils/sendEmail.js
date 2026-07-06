const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOTP = async (email, otp) => {
  try {
    await transporter.verify();
    console.log("✅ Brevo SMTP Connected");

    const info = await transporter.sendMail({
      from: `"StockPilot" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "StockPilot OTP Verification",
      html: `
      <div style="font-family:Arial;padding:20px">
          <h2>StockPilot Account Verification</h2>

          <p>Your OTP is</p>

          <h1 style="color:#2563eb;font-size:40px;">
              ${otp}
          </h1>

          <p>This OTP will expire in <b>5 minutes</b>.</p>

          <hr>

          <small>
            If you didn't request this OTP, simply ignore this email.
          </small>
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