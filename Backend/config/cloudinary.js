import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async () => {

    cloudinary.config({
        cloude_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secrete: process.env.CLOUDINARY_SECRETE_KEY
    });
}

export default connectCloudinary;