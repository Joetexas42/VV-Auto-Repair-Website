import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const RECIPIENT = "Paperstreetsoftware@gmail.com";

function createTransporter() {
  const user = process.env["CONTACT_EMAIL_USER"];
  const pass = process.env["CONTACT_EMAIL_PASS"];

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: "name, email, and message are required" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  logger.info({ name, email }, "Contact form submission received");

  const transporter = createTransporter();

  if (!transporter) {
    logger.warn(
      "CONTACT_EMAIL_USER / CONTACT_EMAIL_PASS not set — email not sent",
    );
    res.json({ ok: true, delivered: false });
    return;
  }

  try {
    await transporter.sendMail({
      from: `"VV Auto Built-By Form" <${process.env["CONTACT_EMAIL_USER"]}>`,
      to: RECIPIENT,
      replyTo: email.trim(),
      subject: `New enquiry from ${name.trim()} via PaperStreet.online`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        "",
        message.trim(),
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
        <hr/>
        <p>${message.trim().replace(/\n/g, "<br/>")}</p>
      `,
    });

    logger.info({ name, email }, "Contact email sent successfully");
    res.json({ ok: true, delivered: true });
  } catch (err) {
    logger.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default router;
