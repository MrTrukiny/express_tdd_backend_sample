const transporter = require('../../config/emailTransporter');

const sendAccountActivationEmail = async (email, token) => {
  await transporter.sendMail({
    from: 'My App <info@my-app.com>',
    to: email,
    subject: 'Account Activation',
    html: `Token is ${token}`,
  });
};

module.exports = { sendAccountActivationEmail };
