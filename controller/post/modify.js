import Posting from "../../models/Posting.js";
import { checkType, deleteMany } from '../../utils/multer.js';

const modify = async (req, res) => {
    const { userId, content, hashtag, place } = req.body;
    const postingId = req.params.id;
    const images = req.files;
    let path = images.map(img => img.location)

    if(!userId || userId === 'undefined') {
        deleteMany(path)
        return res.status(400).send('필수 요소가 들어오지 않았습니다.')
    } 

    if(!checkType(images)) {
        deleteMany(path)
        return res.status(400).send('잘못된 파일 형식입니다.')
    }

    try {
        // * 현재 저장된 image 경로 찾기 * 
        const beforeInfo = await Posting.findOne({_id: postingId}).select('image userId status')
        const beforeImg = beforeInfo.image
    
        if(!beforeInfo.status) {
            deleteMany(path)
            return res.status(404).send('존재하지 않는 게시물 입니다.')
        } else if(beforeInfo.userId !== userId) {
            deleteMany(path)
            return res.status(401).send('게시물에 수정 권한이 없는 유저입니다.')
        } 

        // * 수정사항 DB에 업데이트 *
        const updateFunc = async (tags, str, plc, imgs) => {
            let result = {}
            if(tags) {
                let tagArr = tags.split('#').slice(1).map(tag => tag.replace(',', '')) 
                console.log('tagArr', tagArr)
                result = await Posting.findByIdAndUpdate(postingId, {hashtag: tagArr}, {new:true, upsert: true}).exec()
            }

            if(str) {
                result = await Posting.findByIdAndUpdate(postingId, {content: str}, {new:true}).exec()
            } 

            if(plc) {
                result = await Posting.findByIdAndUpdate(postingId, {place: plc}, {new: true, upsert: true})
            }

            if(imgs) {
                result = await Posting.findByIdAndUpdate(postingId, {image: imgs}, {new: true})
            }
            return result
        }

        const newPosting = await updateFunc(hashtag, content, place, path)

        // * S3 버킷에 저장된 이전 image 삭제 *
        let deleteImg = beforeImg.filter(img => !newPosting.image.includes(img))
        deleteMany(deleteImg)

        return res.send({
           data: newPosting,
           message: "게시물 수정 성공"
        })
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')      
    }
    
}

export default modify;


//게시물 삭제해야될 때 -> 삭제한 게시물 데이터 필요
//게시물 수정할 때 -> 수정한 게시물의 정보를 보내기
