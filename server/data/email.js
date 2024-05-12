const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'deedewtech@gmail.com',
    pass: 'iiabxaxabwubchxp'
  }
});

const sendWishEmail = (senderName, message) => {
  const mailOptions = {
    from: 'deedewtech@gmail.com',
    to: 'bondziekukua@gmail.com',
    bbc:'vankelvin603@gmail.com',
    subject: `New Birthday Wish from ${senderName}`,
    html: `
    <html>
    <body style="background-image: url('./images/image-1.png'); background-size: cover; padding:15px; border-radius: 10px background-color: #f2f2f2;">
      <h3>New Birthday Wish from ${senderName}</h3>
      <p>${message}</p>
      <p>Sent by: ${senderName}</p>
    </body>
  </html>
  `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendWishEmail;