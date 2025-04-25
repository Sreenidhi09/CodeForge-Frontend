const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5001;
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());

const codes = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-code", async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  codes[email] = code;

  try {
    await transporter.sendMail({
        from: `"CodeForge Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Verification Code',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #1a73e8;">Hello!</h2>
            <p>Thank you for signing up with <strong>CodeForge</strong>.</p>
            <p>Your email verification code is:</p>
            <h1 style="font-size: 32px; color: #1a73e8; margin: 10px 0;">${code}</h1>
            <p>Please enter this code in the app to complete your email verification process.</p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />

            <p style="font-size: 14px; color: #555;">
                This email was sent by <strong>CodeForge Technologies Pvt. Ltd.</strong><br />
                We take your privacy and security seriously. If you did not request this verification, please ignore this email or contact our support team.
            </p>

            <p style="font-size: 14px; color: #555;">
                With ❤️ from the CodeForge Team
            </p>
            </div>
        `,
    });

    res.status(200).json({ success: true, message: "Code sent to email" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  const validCode = codes[email];

  if (validCode && code === validCode) {
    delete codes[email];
    res.status(200).json({ success: true, message: "Verification successful" });
  } else {
    res.status(400).json({ success: false, error: "Invalid verification code" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
