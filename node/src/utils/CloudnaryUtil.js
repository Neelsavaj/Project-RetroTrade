const cloundinary = require("cloudinary").v2;


const uploadFileToCloudinary = async (file) => {
 
    //conif
        cloundinary.config({
        cloud_name:"dt0ig8ojp",
        api_key:"982654381359332",
        api_secret:"b9ztWDmoJoIx0ZtFJJdo7i8brls"
    })

    const cloundinaryResponse = await cloundinary.uploader.upload(file.path);
    return cloundinaryResponse;



};
module.exports = {
    uploadFileToCloudinary
}