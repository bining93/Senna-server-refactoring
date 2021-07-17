import Posting from "../../models/Posting.js";

const getPosting = async (req, res) => {
    const postingId = req.params.id;

    if(!postingId) {
        return res.status(400).send('게시물 id가 없습니다.')
    }

    try{
        const postingInfo = await Posting.findById(postingId)
        
        return res.send({
            data: postingInfo
        })

    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
    
}

export default getPosting;