const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// require('../config/cloudinary.config');

// const storage = CloudinaryStorage({
//   folder: "images",
//   allowedFormats: ["jpg", "png"],
//   transformation: [{
//     width: 500,
//     height: 500,
//     crop: "limit"
//   }],
//   cloudinary: cloudinary
// });

// module.exports = multer({storage: storage});

const multerStorage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, "src/uploads/");
    // },
    // filename: (req, file, cb) => {
    //   cb(null, Date.now()+file.originalname);
    // },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Not a image file!!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    transforms: () =>
      sharp().resize(250, 250).jpeg({
        progressive: true,
        quality: 80,
    }),
});

module.exports = upload;


