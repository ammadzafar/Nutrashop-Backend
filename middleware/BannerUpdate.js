const multer = require("multer");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/banners");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-banners-${file.originalname}`);
    },
});
var uploadFile = multer({storage: storage, fileFilter: imageFilter});
var uploadMultiple = uploadFile.fields([{ name: 'file1', maxCount: 10 }, { name: 'file2', maxCount: 10 }])
module.exports = uploadMultiple;
