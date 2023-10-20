var cloudinary = require('cloudinary').v2

// cloudinary.config({
//     cloud_name:process.env.Cloud_NAME,
//     api_key:process.env.API_KEY,
//     api_secret:process.env.API_SECRET
// })
cloudinary.config({ 
    cloud_name: 'dib0ztnjb', 
    api_key: '768277219173428', 
    api_secret: '9aUoSBRipxKZRhrISxKkTOJmVEY' 
  });

module.exports = cloudinary;