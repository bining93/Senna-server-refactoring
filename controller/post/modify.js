import Posting from "../../models/Posting.js";
import s3 from '../../config/s3.js'
import { checkType } from '../../utils/multer.js';

//게시물 수정 
const modify = async (req, res) => {
    //postingId 값이 params에 담겨져 온다. 
    //console.log('req', req.params.id)
    const { userId, content } = req.body;
    const postingId = req.params.id;
    const images = req.files;
    const path = images.map(img => img.location)
    const type = images.map(img => img.mimetype.split('/')[1])

    if(!userId) {
        return res.status(400).send('필수 요소가 들어오지 않았습니다.')
    } else if(!checkType(type)) {
        return res.status(400).send('잘못된 파일 형식입니다.')
    }

    try {
        //이전에 image를 불러온다.
        const beforeInfo = await Posting.findOne({_id: postingId}).select('image userId status')
        console.log('beforeInfo', beforeInfo)
        let beforeImg = beforeInfo.image;

        if(!beforeInfo.status) {
            return res.status(404).send('존재하지 않는 게시물 입니다.')
        } else if(beforeInfo.userId !== userId) {
            return res.status(401).send('게시물에 수정 권한이 없는 유저입니다.')
        } 
        //new option을 써서 수정 후 값을 리턴값으로 받도록 한다.
        const update = await Posting.findByIdAndUpdate(postingId, {image: path, content: content}, {new:true}).exec()
        console.log('update', update)
        
        let deleteImg = beforeImg.filter(img => !update.image.includes(img)).map(el => el.split('com/'))
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
        
        return res.send({
           data: update,
           message: "게시물 수정 성공"
        })
    
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')      
    }
}

export default modify;


//게시물 삭제해야될 때 -> 삭제한 게시물 데이터 필요
//게시물 수정할 때 -> 수정한 게시물의 정보를 보내기
