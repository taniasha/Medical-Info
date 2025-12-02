import nodemailer from 'nodemailer';

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "titu192005@gmail.com", // Your new email
    pass: "kslb qzby gkrg ehof", // Use environment variable for password
  },
});

export const sendMail = async (to, subject, text, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: "titu192005@gmail.com",
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
      from: "titu192005@gmail.com",
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
