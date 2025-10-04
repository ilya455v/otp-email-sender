require("dotenv").config();
const express = require("express");
const { Resend } = require("resend");

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await resend.emails.send({
      from: "no-reply@yourdomain.com", // твой адрес Resend
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    });

    res.json({ success: true, otp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
