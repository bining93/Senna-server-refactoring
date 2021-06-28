import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../config/s3.js';
//ReferenceError: __dirname is not defined
//import path from 'path';
//const __dirname = path.resolve();


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'senna-image',
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`) // 이름 설정
        }
    })
})
//const upload = multer({
//    dest: 'uploads/'
//})

export default upload;