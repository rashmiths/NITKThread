require('dotenv').config();
const cloudinary = require('cloudinary').v2;

let PORT = 3005;
let MONGODB_URI = 'mongodb+srv://GoCode:GoCode@cluster0.zcitw.mongodb.net/NITKThread?retryWrites=true&w=majority';
let SECRET = 'jwt-something';
const UPLOAD_PRESET = process.env.UPLOAD_PRESET || 'ml_default';

cloudinary.config({
  cloud_name: 'doqxwd5vy',
  api_key: '172736955169323',
  api_secret: '_fUJkhyZUm8l9ymVvWASjhGBav8',
});

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  cloudinary,
  UPLOAD_PRESET
};
