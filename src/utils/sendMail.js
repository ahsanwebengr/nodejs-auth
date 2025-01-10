import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
import {
  NODE_MAILER_EMAIL,
  NODE_MAILER_PASSWORD
} from '../configs/env.config.js';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.email',
  port: 587,
  secure: true,
  auth: {
    user: NODE_MAILER_EMAIL,
    pass: NODE_MAILER_PASSWORD
  }
});

export const sendMail = async (transporter, email, subject, html) => {
  try {
    await transporter.sendMail({
      from: {
        name: 'Node Mailer',
        address: NODE_MAILER_PASSWORD
      },
      to: email,
      subject,
      html
    });
    console.log('Email send successfully');
  } catch (error) {
    console.log(error);
  }
};
