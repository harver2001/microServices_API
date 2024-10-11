const Otps = require('../models/otpModel.js');
const Users = require('../models/userModel.js');
const randomstring = require('randomstring');
const sendEmail = require('../utils/sendEmails');
const axios = require('axios');

function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

exports.sendOTP = async (req, res) => {
    // console.log('SMTP_SERVICE:', process.env.SMTP_SERVICE);
    // console.log('SMTP_PORT:', process.env.SMTP_PORT);
    // console.log('SMTP_MAIL:', process.env.SMTP_MAIL);
    // console.log('SMTP_APP_PASS:', process.env.SMTP_APP_PASS);
    try {
        const { email } = req.query;
        const otp = generateOTP();
        const newOTP = new Otps({ email, otp });
        await newOTP.save();
        
        await sendEmail({
            to: email,
            subject: 'Your OTP',
            message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        });

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.query;
        const existingOTP = await Otps.findOneAndDelete({ email, otp });
        const existingUser = await Users.findOne({email});
        
        if (existingOTP && existingUser) {
            res.status(200).json({ success: true, message: 'OTP verification successful' });
            const user = await Users.findOneAndUpdate({email}, {$set : {isUserVerified: true}});
        } else {
            res.status(400).json({ success: false, error: 'No User Found or Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

exports.userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await Users.findOne({ email });
        
        if(user){
            return res.status(404).json("User already registered");
        }

        // try {
        //     const otpResponse = await axios.get(`https://otpgenerateandverify.onrender.com/api/sendOTP?email=${email}`);
        //     console.log("OTP request response:", otpResponse.data);
        // } catch (otpError) {
        //     console.error("Error sending OTP:", otpError.response ? otpError.response.data : otpError.message);
        //     return res.status(500).json({ status: false, error: 'Error sending OTP' });
        // }

        const newUser = new Users({ name, email, password });
        await newUser.save();
        res.status(201).json({ status: true, message: 'User registered successfully' });
    } catch (error) {
        console.log("Error registering the user:", error);
        res.status(500).json({ status: false, error: 'Internal server error' });
    }
};

exports.userLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await Users.findOne({ email: email, password: password });
        if(!user){
            return res.status(404).json({ status: false, error: 'User not found' });
        }
        const userVerified = user.isUserVerified;
        if(!userVerified){
            await Users.deleteOne({ _id : user._id });
            return res.status(403).json({ status: false, error: 'User not verified' });
        }
        if(user.isUserLoggedIn){
            return res.status(403).json({ status: false, error: 'User already logged in' });
        }
        await Users.findOneAndUpdate({ _id : user._id}, {$set : {isUserLoggedIn : true}})
        res.status(200).json({ success : true, message : 'Login Successful' });
    }
    catch(error){
        console.error('Error logging in user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.userLogout = async (req, res) => {
    try{
        const user = await Users.findOne({ email : req.body.email});
        if(!user){
            return res.status(401).json({success: false, message : "User not found"})
        }
        else if(!user.isUserLoggedIn) return res.status(202).json({message : 'User logged out already'});
        await Users.findOneAndUpdate({ _id : user._id}, {$set : {isUserLoggedIn : false}});
        return res.status(200).json({success : true, message : 'User Logged Out'});
    }
    catch(error){
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}