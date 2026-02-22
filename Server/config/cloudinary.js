const cloudinary = require('cloudinary').v2

// Configure Cloudinary with your account details from environment variables
// This allows us to upload images to the cloud storage service
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,  // Your Cloudinary cloud name
    api_key: process.env.CLOUD_KEY,      // Your Cloudinary API key
    api_secret: process.env.CLOUD_SECRET, // Your Cloudinary API secret (fixed typo from 'api_secreat')
})

module.exports = cloudinary;
