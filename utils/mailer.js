const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


// Create reusable transporter object using the SMTP transport
const transporterDetails = smtpTransport({
  host: "smtp.c1.liara.email",
  port: 465,
  secure: true,
  auth: {
    user: "brave_meninsky_a2ct62",
    pass: "328e2fcf-a615-4734-ac57-9c575feed6ea",
  },
});

exports.sendEmail = (email, fullname, subject, message) => {
  const transporter = nodeMailer.createTransport(transporterDetails);
  
  transporter.sendMail({
    from: 'himo@azimhatami.ir',
    to: email,
    subject: subject,
    html: `<h1>سلام ${fullname}</h1>
      <p>${message}</p>`,
  })
}
