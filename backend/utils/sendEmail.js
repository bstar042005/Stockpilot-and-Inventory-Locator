const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
  try {
    console.log("Sending OTP to:", email);

    const { data, error } = await resend.emails.send({
      from: "StockPilot <onboarding@resend.dev>",
      to: email,
      subject: "StockPilot OTP Verification",
      html: `
      <div style="font-family:Arial;padding:20px">
        <h2>StockPilot Account Verification</h2>

        <p>Your OTP is</p>

        <h1 style="font-size:40px;color:#2563eb;">
          ${otp}
        </h1>

        <p>This OTP will expire in 5 minutes.</p>

        <hr>

        <small>
          If you didn't request this OTP, please ignore this email.
        </small>
      </div>
      `,
    });

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    console.log("OTP Sent Successfully");
    console.log(data);

    return true;

  } catch (err) {
    console.error("RESEND ERROR");
    console.error(err);
    throw err;
  }
};

module.exports = sendOTP;