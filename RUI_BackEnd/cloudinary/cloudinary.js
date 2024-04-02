const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.CLOUDINARY_CLOUD_NAME);


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadToCloudinary = async (path, folder) => {
    // return cloudinary.v2.uploader.upload(path, {
    //     folder
    // }).then((data) => {
    //     return { url: data.url, public_id: data.public_id };
    // }).catch((error) => {
    //     console.log(error)
    // })
    try {
        console.log("bhmnnnbnnnnnnnnnnnnnnnnnnnnnnnnnnnn-------------------------------->");
        const data = await cloudinary.uploader.upload(path, {
            folder
        });
        console.log({ data });
        return { url: data.url, public_id: data.public_id };
        
    } catch (error) {
        console.log(error);
    }
}

const removeFromCloudinary = async (public_id) => {
    await cloudinary.v2.uploader.destroy(public_id, function (error, result) {
        console.log(result, error)
    })
}

module.exports = { uploadToCloudinary, removeFromCloudinary }

