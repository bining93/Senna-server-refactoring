import Posting from "../../models/Posting.js";
import { checkType, deleteMany } from '../../utils/multer.js';

//게시물 수정 
const modify = async (req, res) => {
    //postingId 값이 params에 담겨져 온다. 
    //console.log('req', req.params.id)
    //조건문 써서 분기하기 ... ><
    console.log('req.files', req.files)
    const { userId, content, hashtag } = req.body;
    const postingId = req.params.id;
    const images = req.files;
    const type = images.map(img => img.mimetype.split('/')[1])
    let path = images.map(img => img.location)
    let tagArr = [] || hashtag.split('#').slice(1).map(tag => tag.replace(',', '')) 
    console.log('tagArr', tagArr)

    if(!userId || userId === 'undefined') {
        deleteMany(path)
        return res.status(400).send('필수 요소가 들어오지 않았습니다.')
    } 

    if(!checkType(type)) {
        deleteMany(path)
        return res.status(400).send('잘못된 파일 형식입니다.')
    }

    try {
        //이전에 image를 불러온다.
        const beforeInfo = await Posting.findOne({_id: postingId}).select('image userId hashtag content status')
        console.log('beforeInfo', beforeInfo)
        const beforeImg = beforeInfo.image
    
        if(!beforeInfo.status) {
            deleteMany(path)
            return res.status(404).send('존재하지 않는 게시물 입니다.')
        } else if(beforeInfo.userId !== userId) {
            deleteMany(path)
            return res.status(401).send('게시물에 수정 권한이 없는 유저입니다.')
        } 
        
        const update = await Posting.findByIdAndUpdate(postingId, {$set: {image: path, content: content, hashtag: tagArr} }, {new:true}).exec()
        console.log('update', update)
        
        let imgs = beforeImg.filter(img => !update.image.includes(img))
        console.log('deleteImg',imgs)
        deleteMany(imgs)
        
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
