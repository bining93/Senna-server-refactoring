import Posting from "../../models/Posting.js";
import { checkType, deleteMany } from "../../utils/multer.js";

//게시글 올릴 때 - 정보 받아다가 DB에 doc 생성하기
const upload = async (req, res) => {
    const { hashtag, content, userId, place } = req.body;
    const images = req.files;
    const path = images.map(img => img.location)
    console.log('images', images)
    console.log('place', place)

    if(!content || !userId || images.length === 0 || content === 'undefined' || userId === 'undefined') {
        deleteMany(path)
        return res.status(400).send('필수 요소가 들어오지 않았습니다.')
    } 

    if(!checkType(images)) {
        deleteMany(path)
        return res.status(400).send('잘못된 파일 형식입니다.')
    }

    try {
        let tagArr;
        if(hashtag) {
            tagArr = hashtag.split('#').slice(1)
        } 
        console.log('tagArr', tagArr)

        const newPosting = await Posting.create({
            userId,
            content,
            place,
            image: path,
            hashtag: tagArr,
        })
        
        console.log('newPosting', newPosting);
        return res.send({
            data: newPosting,
            message: '게시물 등록 성공'
        })

    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}

export default upload;