import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,  // from .env
    pass: process.env.EMAIL_PASS,  // from .env
  },
});

export const sendMail = async (to, subject, text, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: htmlContent,
    });
    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const orderMail = async (to, subject, text, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: htmlContent,
    });
    console.log("Order email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending order email:", error);
    return false;
  }
};
