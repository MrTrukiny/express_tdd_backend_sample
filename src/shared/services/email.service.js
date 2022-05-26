const nodemailer = require('nodemailer');
const transporter = require('../../config/emailTransporter');
const { NODE_ENV } = require('../../../config');
const { EmailException } = require('../errors/emailException');

const sendAccountActivationEmail = async (email, token) => {
  const info = await transporter
    .sendMail({
      from: 'My App <info@my-app.com>',
      to: email,
      subject: 'Account Activation',
      html: `
      <div>
        <b>Please click below link to activate your account</b>
      </div>
      <div>
        <a href="http://localhost:8080/login?token=${token}">Activate</a>
      </div>
      `,
    })
    .catch(() => {
      throw new EmailException();
    });
  if (NODE_ENV === 'development') {
    console.info('EtherealUrl: ' + nodemailer.getTestMessageUrl(info));
  }
};

module.exports = { sendAccountActivationEmail };
