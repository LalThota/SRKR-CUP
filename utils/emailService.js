const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to generate a random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for College Utility Portal Registration',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #3b82f6;">College Utility Portal</h2>
                </div>
                <div style="margin-bottom: 20px;">
                    <p>Hello,</p>
                    <p>Thank you for registering with the College Utility Portal. To complete your registration, please use the following One-Time Password (OTP):</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                        <h2 style="margin: 0; color: #1e40af; letter-spacing: 5px;">${otp}</h2>
                    </div>
                    <p>This OTP is valid for 10 minutes. Please do not share this OTP with anyone.</p>
                </div>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #6b7280;">
                    <p>If you did not request this OTP, please ignore this email.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

// Function to send password reset email with OTP
const sendPasswordResetEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset - College Utility Portal',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #3b82f6;">College Utility Portal</h2>
                </div>
                <div style="margin-bottom: 20px;">
                    <p>Hello,</p>
                    <p>We received a request to reset your password. Please use the following One-Time Password (OTP) to verify your identity:</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                        <h2 style="margin: 0; color: #1e40af; letter-spacing: 5px;">${otp}</h2>
                    </div>
                    <p>This OTP is valid for 10 minutes. After verification, you'll be able to set a new password.</p>
                    <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
                </div>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #6b7280;">
                    <p>This is an automated message, please do not reply to this email.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return false;
    }
};

module.exports = {
    generateOTP,
    sendOTPEmail,
    sendPasswordResetEmail
};