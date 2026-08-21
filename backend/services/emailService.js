const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

const sendLeadNotifications = async (lead) => {
  const submittedAt = new Date(lead.createdAt || Date.now()).toLocaleString('en-CA', {
    timeZone: 'America/Toronto',
  });

  const adminHtml = `
    <h2>New Nova Hardscapes Consultation Request</h2>
    <p><strong>Name:</strong> ${lead.fullName}</p>
    <p><strong>Phone:</strong> ${lead.phone}</p>
    <p><strong>Email:</strong> ${lead.email || 'N/A'}</p>
    <p><strong>Address:</strong> ${lead.address || 'N/A'}</p>
    <p><strong>Service:</strong> ${lead.service}</p>
    <p><strong>Preferred Contact Method:</strong> ${lead.preferredContactMethod}</p>
    <p><strong>Preferred Contact Time:</strong> ${lead.preferredContactTime || 'N/A'}</p>
    <p><strong>Message:</strong> ${lead.message || 'N/A'}</p>
    <p><strong>Submitted:</strong> ${submittedAt}</p>
  `;

  const customerHtml = `
    <p>Hi ${lead.fullName},</p>
    <p>Thanks for contacting Nova Hardscapes.</p>
    <p>We've received your consultation request and a member of our team will be in touch shortly.</p>
    <p>If your project is time-sensitive, feel free to call us directly at <strong>613-213-8000</strong>.</p>
    <p>— Nova Hardscapes</p>
  `;

  const sendPromises = [
    transporter.sendMail({
      from: `"Nova Hardscapes" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Nova Hardscapes Consultation Request',
      html: adminHtml,
    }),
  ];

  if (lead.email) {
    sendPromises.push(
      transporter.sendMail({
        from: `"Nova Hardscapes" <${process.env.SMTP_USER}>`,
        to: lead.email,
        subject: 'We received your consultation request — Nova Hardscapes',
        html: customerHtml,
      })
    );
  }

  await Promise.allSettled(sendPromises);
};

module.exports = { sendLeadNotifications };
