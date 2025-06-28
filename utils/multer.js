const multer = require('multer');

// let fileName = `${uuid()}.jpg`;
// exports.storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads/")
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${uuid()}_${file.originalname}`)
//   }
// });

exports.fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg") {
    cb(null, true)
  } else {
    cb("تنها پسوند JPEG پشتیبانی میشود", false)
  }
};

// exports.upload = multer({
//   storage: storage,
//   limits: { fileSize: 4 * 1024 * 1024 }, // 4MB
//   fileFilter: fileFilter
// }).single('thumbnail'); 
