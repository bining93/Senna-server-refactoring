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
        	if (img === 'jpeg' || img === 'jpg' || img === 'png' || img === 'cif') {
                return true
            }
            return false
        })
    } else {
        if(type === 'jpeg' || type === 'jpg' || type === 'png' || type === 'cif') {
            return true
        }
        return false
    }
} 
//const upload = multer({
//    dest: 'uploads/'
//})

export { upload, checkType };