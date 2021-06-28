import multer from "multer";

// multer-optional
let storage = multer.diskStorage({
 destination: (req, file, cb) => {
   cb(null, "uploads/");
 },
 filename: (req, file, cb) => {
   cb(null, `${Date.now()}_${file.originalname}`);
 },
});
let upload = multer({ storage: storage }).single("profile_img")

export default upload;