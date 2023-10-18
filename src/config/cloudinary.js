const cloudinary = require("cloudinary");

const CLOUDINARY_URL="cloudinary://434734818974985:hFZ552vypzRW2Gmrc5cvfqzTcF0@dwlup3pzb"

cloudinary.config({
    cloud_name: "dwlup3pzb",
    api_key: "434734818974985",
    api_secret: "hFZ552vypzRW2Gmrc5cvfqzTcF0",
});


module.exports = cloudinary;