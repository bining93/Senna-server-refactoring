import Posting from "../../models/Posting.js";
import { checkType, deleteMany } from '../../utils/multer.js';

const modify = async (req, res) => {
    const { userId, content, hashtag } = req.body;
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
        //이전에 image를 불러온다.
        const beforeInfo = await Posting.findOne({_id: postingId}).select('image userId status')
        console.log('beforeInfo', beforeInfo)
        const beforeImg = beforeInfo.image
    
        if(!beforeInfo.status) {
            deleteMany(path)
            return res.status(404).send('존재하지 않는 게시물 입니다.')
        } else if(beforeInfo.userId !== userId) {
            deleteMany(path)
            return res.status(401).send('게시물에 수정 권한이 없는 유저입니다.')
        } 
        
        const updateFunc = async (tags, str, imgs) => {
            //content / hashtag만 선택사항이 될 수 있도록 만들기 
            let result = {}
            if(hashtag) {
                let tagArr = tags.split('#').slice(1).map(tag => tag.replace(',', '')) 
                console.log('tagArr', tagArr)
                result = await Posting.findByIdAndUpdate(postingId, {hashtag: tagArr}, {new:true}).exec()
            }

            if(str) {
                result = await Posting.findByIdAndUpdate(postingId, {content: str}, {new:true}).exec()
            } 

            if(imgs) {
                result = await Posting.findByIdAndUpdate(postingId, {image: imgs}, {new: true})
                //이전 이미지 지우기
                let deleteImg = beforeImg.filter(img => !newPosting.image.includes(img))
                console.log('deleteImg',deleteImg)
                deleteMany(deleteImg)
            }
            return result
        }
        const newPosting = await updateFunc(hashtag, content, path)
        console.log('newPost', newPosting)
    
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
