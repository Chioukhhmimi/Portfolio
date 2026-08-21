import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail({ to, subject, html, text }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER or EMAIL_PASS not set');
  }
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    text,
  });
}

export async function sendContactEmail({ name, email, phone, message }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER or EMAIL_PASS not set');
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `New message from ${name} — Portfolio Contact`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #111; border-bottom: 2px solid #eee; padding-bottom: 10px;">
          New Contact Form Message
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555; width: 100px;">Name</td>
            <td style="padding: 8px 0; color: #111;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email</td>
            <td style="padding: 8px 0; color: #111;">
              <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
            </td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone</td>
            <td style="padding: 8px 0; color: #111;">
              <a href="tel:${phone}" style="color: #2563eb;">${phone}</a>
            </td>
          </tr>
          ` : ''}
        </table>
        <div style="background: #f9f9f9; border-left: 4px solid #2563eb; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; color: #111; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          Sent from your portfolio contact form
        </p>
      </div>
    `,
    text: `New message from ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\n\n${message}`,
  };

  return transporter.sendMail(mailOptions);
}
