const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Express server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const BREVO_API_URL = "https://api.brevo.com/v3/transactionalSMS/sms";
const BREVO_HEADERS = {
    "accept": "application/json",
    "content-type": "application/json",
    "api-key": config.BREVO_API_KEY // Replace with your Brevo API key
};

// Temporary storage for OTPs
const otpStorage = {};

app.post('/send-otp', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();  // Generate 6-digit OTP

    otpStorage[phoneNumber] = otp;

    axios.post(BREVO_API_URL, {
        recipient: phoneNumber,
        sender: "YourAppName",
        content: `Your OTP is: ${otp}`
    }, { headers: BREVO_HEADERS })
    .then(response => {
        res.json({ success: true, message: "OTP sent successfully." });
    })
    .catch(error => {
        res.json({ success: false, message: "Failed to send OTP." });
    });
});

app.post('/verify-otp', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const receivedOtp = req.body.otp;

    console.log(`Received OTP: ${receivedOtp}, Stored OTP: ${otpStorage[phoneNumber]}`);
    if (otpStorage[phoneNumber] === receivedOtp) {
        delete otpStorage[phoneNumber];
        res.json({ success: true, message: "OTP verified successfully." });
    } else {
        res.json({ success: false, message: "Invalid OTP." });
    }
});
