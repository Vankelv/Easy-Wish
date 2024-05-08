const express = require('express');
const cors = require('cors');
const qrCode = require('qrcode');
const router = express.Router();


router.get('/', async(req, res) => {
    try{
        const formUrl = 'https://your-form-url.com'; // Replace with your actual form URL
        const qrCodeImage = await qrCode.toDataURL(formUrl);

        // Send the QR code image as response
        res.send(qrCodeImage);

    } catch(err){
        console.error('Error generating QR code:', err);
        res.status(500).json({ message: 'Error generating QR code' });

    }
})