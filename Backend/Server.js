import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";

dotenv.config();
const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.set("trust proxy", 1);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,
  message: "Too many requests, please try again later.",
});
app.use("/send-email", limiter);

// reCAPTCHA verification
async function verifyCaptcha(token) {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    { method: "POST" }
  );
  return res.json();
}

// Test endpoint
app.get("/", (req, res) => {
  res.send("✅ Christ The King Backend is running!");
});

// CORS config
app.use(
  cors({
    origin: [
      "https://christthekingemba.netlify.app",
      "http://localhost:5173",
    ],
    methods: ["POST", "GET"],
  })
);

// ================================
// 📩 SEND EMAIL ROUTE (Resend API)
// ================================
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // 📥 Email to Church Admin
    const adminMailOptions = {
      subject: `📩 New Message from ${name}`,
      html: `
      <div style="font-family: 'Poppins', Arial, sans-serif; background-color: #f8f9fb; padding: 30px; color: #333;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
          <div style="background: linear-gradient(90deg, #7E212E, #1D6B4C); color: white; text-align: center; padding: 25px;">
            <img src="https://christthekingemba.netlify.app/logo.png" alt="Christ The King Parish Logo" style="width: 90px; border-radius: 50%; margin-bottom: 10px;" />
            <h2 style="margin: 0;">📥 New Website Inquiry</h2>
            <p>Christ The King Catholic Parish, Embakasi</p>
          </div>

          <div style="padding: 25px;">
            <p>Dear Admin,</p>
            <p>You have received a new message from the parish website contact form.</p>

            <div style="background: #f3f7f6; border-left: 4px solid #1D6B4C; padding: 15px; border-radius: 8px;">
              <p><strong>👤 Name:</strong> ${name}</p>
              <p><strong>✉️ Email:</strong> ${email}</p>
            </div>

            <div style="margin-top: 25px;">
              <strong>💬 Message:</strong>
              <blockquote style="background: #f9f9f9; border-left: 4px solid #7E212E; padding: 15px; border-radius: 6px;">
                ${message}
              </blockquote>
            </div>

            <p style="font-size: 14px; color: #666;">Please respond promptly to maintain excellent communication with parishioners.</p>
          </div>

          <div style="background-color: #f0f0f0; text-align: center; padding: 15px; font-size: 13px;">
            <p>Christ The King Catholic Parish, Embakasi</p>
            <p>📞 0202495785 | ✉️ ctkcatholicparishemba@gmail.com</p>
          </div>
        </div>
      </div>
      `,
    };

    // 📤 Auto-reply Email to Sender
    const confirmationMailOptions = {
      subject: "🙏 Thank you for contacting Christ The King Catholic Parish",
      html: `
      <div style="font-family: 'Poppins', Arial, sans-serif; background-color: #f9f9f9; padding: 30px; color: #333;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(90deg, #1D6B4C, #7E212E); color: white; text-align: center; padding: 25px;">
            <img src="https://christthekingemba.netlify.app/logo.png" style="width: 90px; border-radius: 50%;" />
            <h2>Christ The King Catholic Parish, Embakasi</h2>
            <p>"To Serve, To Love, To Grow in Faith"</p>
          </div>

          <div style="padding: 25px;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for reaching out! We’ve received your message and will respond shortly.</p>

            <div style="background: #f2f8f5; border-left: 4px solid #1D6B4C; padding: 15px;">
              <strong>Your message:</strong>
              <p>${message}</p>
            </div>

            <p>Warm regards,<br><strong>Christ The King Catholic Parish</strong></p>
          </div>

          <div style="background-color: #f0f0f0; text-align: center; padding: 15px;">
            © ${new Date().getFullYear()} Christ The King Catholic Parish, Embakasi
          </div>
        </div>
      </div>
      `,
    };

    // ======================
    // 📤 SEND USING RESEND
    // ======================
    await resend.emails.send({
      from: "Christ The King Parish <no-reply@resend.dev>",
      to: process.env.EMAIL_USER,
      subject: adminMailOptions.subject,
      html: adminMailOptions.html,
    });

    await resend.emails.send({
      from: "Christ The King Parish <no-reply@resend.dev>",
      to: email,
      subject: confirmationMailOptions.subject,
      html: confirmationMailOptions.html,
    });

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
