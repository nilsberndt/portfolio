/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

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
  
  var msgval = "Message: " + val.message + " Phone: " + val.phone + " E-mail: " + val.email + " Name: " + val.name;
  var htmlval = "<h2>" + val.message + "</h2><br><br><p><b>Name: </b>" + val.name + "<br><b>E-mail: </b>" + val.email + "<br><b>Phone: </b>" + val.phone + "</p>";
  var subjval = "Portfolio Contact From " + val.name;
  
  
  const mailOptions = {
    from: '"Portfolio Website Contact" <nilsberndt@gmail.com>',
    to: 'nilsberndt@gmail.com',
	subject: subjval,
	text: msgval,
	html: htmlval
  };

  return mailTransport.sendMail(mailOptions)
    .then(() => console.log('Confirmation email sent to nilsberndt@gmail.com'))
    .catch((error) => console.error('There was an error while sending the email:', error));
});
