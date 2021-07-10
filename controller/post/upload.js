import Posting from "../../models/Posting.js";
import { checkType } from "../../utils/multer.js";

//게시글 올릴 때 - 정보 받아다가 DB에 doc 생성하기
const upload = async (req, res) => {
    const { hashtag, content, userId } = req.body;
    console.log('req.body', req.body)
    //hashtag를 formData로 보내면 이런식으로 들어온다. (배열이 아닌 string형식)
    //heelo,ooo
    //img가 req.files로 들어온다. (여러장이라) 
    const images = req.files;

    if(!hashtag || !content || !userId || !images || hashtag === 'undefined' || content === 'undefined' || userId === 'undefined') {
        return res.status(400).send('필수 요소가 들어오지 않았습니다.')
    } 

    //console.log('images', images)
    const path = images.map(img => img.location)
    const type = images.map(img => img.mimetype.split('/')[1])
    //console.log(type)
    //console.log(images)
    //console.log('path', path)
    let tagArr = hashtag.split('#').slice(1) 

    if(!checkType(type)) {
        return res.status(400).send('잘못된 파일 형식입니다.')
    }
    
    try {
        const newPosting = await Posting.create({
            userId,
            content,
            image: path,
            hashtag: tagArr
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