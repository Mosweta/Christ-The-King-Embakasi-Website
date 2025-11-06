import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.set('trust proxy', 1);
// Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests/min
  message: "Too many requests, please try again later.",
});
app.use("/send-email", limiter);

// Verify reCAPTCHA
async function verifyCaptcha(token) {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    { method: "POST" }
  );
  return res.json();
}

app.get("/", (req, res) => {
  res.send("✅ Christ The King Backend is running!");
});

app.use(cors({
  origin: [
    "https://christthekingemba.netlify.app", // your frontend
    "http://localhost:5173" // local testing
  ],
  methods: ["POST", "GET"]
}));


  app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📥 Email to church inbox
   const adminMailOptions = {
  from: `"${name}" <${email}>`,
  to: process.env.EMAIL_USER,
  subject: `📩 New Message from ${name}`,
  html: `
  <div style="font-family: 'Poppins', Arial, sans-serif; background-color: #f8f9fb; padding: 30px; color: #333;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">

      <!-- Header -->
      <div style="background: linear-gradient(90deg, #7E212E, #1D6B4C); color: white; text-align: center; padding: 25px;">
        <img src="https://christthekingemba.netlify.app/logo.png" alt="Christ The King Parish Logo" style="width: 90px; border-radius: 50%; margin-bottom: 10px;" />
        <h2 style="margin: 0;">📥 New Website Inquiry</h2>
        <p style="margin: 5px 0 0;">Christ The King Catholic Parish, Embakasi</p>
      </div>

      <!-- Body -->
      <div style="padding: 25px;">
        <p style="font-size: 15px; line-height: 1.6;">Dear Admin,</p>
        <p style="font-size: 15px; line-height: 1.6;">
          You have received a new message from the parish website contact form.
        </p>

        <!-- Sender Info -->
        <div style="background: #f3f7f6; border-radius: 8px; padding: 15px; margin-top: 15px; border-left: 4px solid #1D6B4C;">
          <p style="margin: 0; font-size: 15px;"><strong>👤 Name:</strong> ${name}</p>
          <p style="margin: 5px 0 0; font-size: 15px;"><strong>✉️ Email:</strong> <a href="mailto:${email}" style="color: #1D6B4C;">${email}</a></p>
        </div>

        <!-- Message -->
        <div style="margin-top: 25px;">
          <p style="font-size: 15px;"><strong>💬 Message:</strong></p>
          <blockquote style="background: #f9f9f9; border-left: 4px solid #7E212E; padding: 15px; border-radius: 6px; margin: 10px 0;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6;">${message}</p>
          </blockquote>
        </div>

        <p style="font-size: 14px; color: #666;">Please respond promptly to maintain excellent communication with parishioners.</p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f0f0f0; text-align: center; padding: 15px; font-size: 13px; color: #555;">
        <p style="margin: 0;">Christ The King Catholic Parish, Embakasi</p>
        <p style="margin: 3px 0 0;">📞 0202495785 | ✉️ ctkcatholicparishemba@gmail.com</p>
      </div>
    </div>
  </div>
  `,
};


    // 📤 Auto-reply to sender
const confirmationMailOptions = {
  from: `"Christ The King Catholic Parish" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "🙏 Thank you for contacting Christ The King Catholic Parish",
  html: `
  <div style="font-family: 'Poppins', Arial, sans-serif; background-color: #f9f9f9; padding: 30px; color: #333;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">

      <!-- Header -->
      <div style="background: linear-gradient(90deg, #1D6B4C, #7E212E); color: white; text-align: center; padding: 25px;">
        <img src="https://christthekingemba.netlify.app/logo.png" alt="Christ The King Parish Logo" style="width: 90px; border-radius: 50%; margin-bottom: 10px;" />
        <h2 style="margin: 0;">Christ The King Catholic Parish, Embakasi</h2>
        <p style="margin: 5px 0 0;">"To Serve, To Love, To Grow in Faith"</p>
      </div>

      <!-- Body -->
      <div style="padding: 25px;">
        <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>

        <p style="font-size: 15px; line-height: 1.6;">
          Thank you for reaching out to <b>Christ The King Catholic Parish, Embakasi.</b>  
          We’ve received your message and our team will respond shortly.
        </p>

        <div style="background-color: #f2f8f5; border-left: 4px solid #1D6B4C; padding: 15px; margin: 20px 0; border-radius: 6px;">
          <p style="margin: 0; font-size: 14px;"><strong>Your message:</strong></p>
          <p style="margin-top: 8px; font-size: 14px; line-height: 1.6;">${message}</p>
        </div>

        <p style="font-size: 15px; line-height: 1.6;">
          Meanwhile, feel free to visit us at our parish or join us in our upcoming masses and community activities.
        </p>

        <p style="margin-top: 25px; font-size: 15px;">
          Warm regards,<br>
          <strong>Christ The King Catholic Parish</strong><br>
          Embakasi, Nairobi<br>
          <a href="mailto:ctkcatholicparishemba@gmail.com" style="color: #1D6B4C; text-decoration: none;">ctkcatholicparishemba@gmail.com</a><br>
          <span style="color: #555;">📞 0202495785</span>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f0f0f0; text-align: center; padding: 15px; font-size: 13px; color: #555;">
        <p style="margin: 0;">✝️ May Christ’s peace be with you always.</p>
        <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Christ The King Catholic Parish, Embakasi</p>
      </div>
    </div>
  </div>
  `,
};



    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(confirmationMailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
