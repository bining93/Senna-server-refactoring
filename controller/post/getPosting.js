import Posting from "../../models/Posting.js";

const getPosting = async (req, res) => {
    //이미지랑 content랑 해쉬태그를 보내주기
    const postingId = req.params.id;

    if(!postingId) {
        return res.status(400).send('게시물 id가 없습니다.')
    }

    try{
        const postingInfo = await Posting.findById(postingId).select('image content hashtag')
        //console.log('postingInfo', postingInfo)
        return res.send({
            data: postingInfo
        })
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
    
}

export default getPosting;