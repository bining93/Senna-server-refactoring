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

const deleteOne = (img) => {
    console.log('imgPath', img)
    if(!img) {
        return 
    }
    const oldImg = img.split('com/')[1];
    console.log('oldImg', oldImg)
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

const deleteMany = (imgs) => {
    //path [
    //    'https://senna-image.s3.ap-northeast-2.amazonaws.com/1626081005719.png',
    //    'https://senna-image.s3.ap-northeast-2.amazonaws.com/1626081005719.png',
    //    'https://senna-image.s3.ap-northeast-2.amazonaws.com/1626081005724.png'
    // ]

    //deleteImg ["https://senna-image.s3.ap-northeast-2.amazonaws.com/1626073188053.jpg"]
    if(!Array.isArray(imgs)) {
        return
    }
    let deleteImg = imgs.map(el => el.split('com/'))
    console.log('deleteImg',deleteImg)

    //s3 버킷에서 수정 전 이미지 삭제
    deleteImg.forEach(path => {
        //console.log('path', path[1])
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