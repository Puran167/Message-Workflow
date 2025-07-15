const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (to, username) => {
  try {
    await resend.emails.send({
      from: 'noreply@resend.dev',
      to,
      subject: `Welcome to Messageflow 🎉`,
      html: `
        <h2>Hello ${username},</h2>
        <p>Welcome to the Message Workflow System!</p>
        <p>You can now log in using your credentials.</p>
        <p>🚀 - Team Messageflow</p>
      `,
    });
  } catch (err) {
    console.error('❌ Email sending failed:', err.message);
  }
};

module.exports = { sendWelcomeEmail };
