import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../config/s3.js';

// * S3 버킷에 파일 업로드 *
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'senna-image',
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, `${Date.now()}.${file.originalname.split('.')[1]}`) 
        }
    })
})

// * 파일 형식 체크 *
const checkType = (type) => {
    if(Array.isArray(type)) {
        const typeArr = type.map(img => img.mimetype.split('/')[1])
        let result = typeArr.map(img => {
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

// * 하나의 파일 삭제 *
const deleteOne = (img) => {
    if(!img) {
        return 
    }
    const oldImg = img.split('com/')[1];

    s3.deleteObject({
        Bucket: 'senna-image',
        Key: oldImg
    }, (err, data) => {
        if(err) {
            console.log(err)
        }
        console.log('기존 이미지 삭제', data)
    });
}

// * 다수의 파일 삭제 *
const deleteMany = (imgs) => {
    if(!Array.isArray(imgs) || imgs.length === 0) {
        return
    }
    let deleteImg = imgs.map(el => el.split('com/'))

    deleteImg.forEach(path => {
        s3.deleteObject({
            Bucket: 'senna-image',
            Key: path[1]
        }, (err, data) => {
            if(err) {
                console.log(err)
            }
            console.log('삭제 data', data)
        })
    })

}
export { upload, checkType, deleteOne, deleteMany };