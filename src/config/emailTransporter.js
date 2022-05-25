/* eslint-disable capitalized-comments */
const nodemailer = require('nodemailer');
const config = require('../../config');
// const nodemailerStub = require('nodemailer-stub');

// const transporter = nodemailer.createTransport(nodemailerStub.stubTransport);

const { NODE_ENV } = config;
const { transportConfig } = config[NODE_ENV].email;

const transporter = nodemailer.createTransport({ ...transportConfig });

module.exports = transporter;
