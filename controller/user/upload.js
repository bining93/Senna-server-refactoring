
const upload = async (req,res) => {
    //const image = req.file;
    console.log(req.file);
    const image = req.file.location

    if(image === undefined) {
        return res.status(400).send('xxx') 
    }
    res.status(200).send({
        data: image,
        
    })

}

export default upload;

/*
다수의 사진 일 때
uploadImages : async (req, res) => {
    const image = req.files;
    const path = image.map(img => img.location);
    if (image === undefined) {
        return res.status(400).send(util.fail(400, "이미지가 존재하지 않습니다."));
    }
    res.status(200).send(util.success(200, "요청 성공 〰️ ", path));
}
}
*/

/*
s3 버킷에서 이미지 삭제하는 코드
import s3 from '../../config/s3.js'
    s3.deleteObject({
        Bucket: 'senna-image',
        Key: 'hristina-satalova-qRvHCZ4rlMs-unsplash.jpg_1624895395683'
    }, (err, data) => {
        if(err) {
            console.log(err)
        }
        console.log('삭제 data', data)
    })
*/