const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    await resend.emails.send({
      from: "OTP Sender <onboarding@resend.dev>",
      to: email,
      subject: "Ваш OTP код",
      text: `Ваш код: ${otp}. Он действует 1 минуту.`,
    });

    res.json({ success: true, message: "OTP отправлен" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Ошибка при отправке" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});