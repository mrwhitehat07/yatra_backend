const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+file.originalname);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype === "img/jpeg" || file.mimetype=== "img/png") {
      cb(null, true);
    } else {
      cb(new Error("Not a image file!!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

module.exports = upload;
