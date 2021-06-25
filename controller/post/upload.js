import Posting from "../../models/Posting.js";

//게시글 올릴 때 - 정보 받아다가 DB에 doc 생성하기
const upload = (req, res) => {
    const { hashtag, content, image, userId } = req.body;
    
    if(!hashtag || !content || !image || !userId) {
        res.status(400).send('필수 요소가 들어오지 않았습니다.')
    }

    Posting.create(
        {
            userId,
            content,
            image,
            hashtag
        }
    )
    .then(data => {
        console.log('data', data)
        res.send({
            data: data,
            message: '게시물 등록 성공'
        })
    }) 
    .catch(err => {
        console.log(err)
        res.status(404).send('게시물 등록에 실패했습니다.')
    })
}

export default upload;