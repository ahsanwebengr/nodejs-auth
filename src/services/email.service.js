import { sendMail, transporter } from '../utils/sendMail.js';

export const sendOtpPasswordEmail = async (email, OTP) => {
  const subject = 'Your Password Reset OTP';
  const htmlContent = `
    <p>Your OTP for password reset is: <strong>${OTP}</strong></p>
    <p>This OTP is valid for <strong>1 minute</strong>. If you did not request this, please ignore this email.</p>
  `;

  try {
    await sendMail(transporter, email, subject, htmlContent);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error while sending OTP email:', error);
  }
};
