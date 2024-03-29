const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./../upload/image",
  filename: (req, file, callback) => {
    return callback(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

module.exports = { upload };
