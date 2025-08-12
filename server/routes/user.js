// src/routes/auth.js
import express from "express";
import { loginUser } from "../controllers/user/login.js";
import { handleRefreshToken } from "../controllers/user/refresh.js";
import { logoutUser } from "../controllers/user/logout.js";

// === NEW IMPORTS FOR FORGOT PASSWORD ===
import crypto from 'crypto';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

const router = express.Router();

// UPDATED NODEMAILER TRANSPORTER CONFIGURATION
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

router.post("/login", loginUser);
router.get("/refresh", handleRefreshToken);
router.post("/logout", logoutUser);

// === NEW ROUTES FOR FORGOT AND RESET PASSWORD ===
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USERNAME,
            subject: 'Password Reset Request',
            html: `
                <p>You requested a password reset</p>
                <p>Click this link to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>This link will expire in 1 hour.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Password reset link sent to your email.' });
        
    } catch (error) {
        console.error('Nodemailer or Server Error:', error);
        res.status(500).json({ message: 'Error sending email. Please check server logs.' });
    }
});


router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been successfully reset.' });

    } catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
});


export default router;
