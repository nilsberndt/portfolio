const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Sends an email confirmation when a user sends a contact message from the site
exports.sendEmailConfirmation = functions.database.ref('/messages/{year}/{month}/{day}/{key}').onWrite((change) => {
  const snapshot = change.after;
  const val = snapshot.val();
  
  const msgval = `Message: ${val.message} Phone: ${val.phone} Email: ${val.email} Name: ${val.name}`;
  const htmlval = `<h2>${val.message}</h2><br/><br/><p><b>Name: </b>${val.name}<br/><b>Email: </b>${val.email}<br/><b>Phone: </b>${val.phone}</p>`;
  const subjval = `Portfolio Contact From  ${val.name}`;
  
  const mailOptions = {
    from: '"Portfolio Website Contact" <nilsberndt@gmail.com>',
    to: 'nilsberndt@gmail.com',
	subject: subjval,
	text: msgval,
	html: htmlval
  };

  return mailTransport.sendMail(mailOptions)
    .then(() => console.log('Confirmation email sent to nilsberndt@gmail.com'))
    .catch((error) => console.error('There was an error while sending the email: ', error));
});
