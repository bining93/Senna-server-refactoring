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
    console.log('type', typeof type)
    if(Array.isArray(type)) {
        let result = type.map(img => {
            console.log('img', img)
        	if (img === 'jpeg' || img === 'jpg' || img === 'png' || img === 'cif') {
                return true
            }
            return false
        })
        if(result.includes(false)) return false
        else return true 
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