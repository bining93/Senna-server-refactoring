import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../config/s3.js';

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'senna-image',
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, `${Date.now()}.${file.originalname.split('.')[1]}`) // 이름 설정
        }
    })
})

const checkType = (type) => {
    if(Array.isArray(type)) {
        type.forEach(img => {
            const type = req.file.mimetype.split('/')[1];
        	if (type !== 'jpeg' || type !== 'jpg' || type !== 'png' || type !== 'cif') {
                
            }
        })
    }
} 
//const upload = multer({
//    dest: 'uploads/'
//})

export default upload;