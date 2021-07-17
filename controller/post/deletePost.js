import Posting from '../../models/Posting.js';
import { deleteMany } from '../../utils/multer.js';

const deletePost = async (req, res) => {
    if(!req.params) {
        return res.status(400).send('잘못된 요청입니다.')
    }
    try {
        const postingId = req.params.id;  
        const update = await Posting.findByIdAndUpdate(postingId, {status: false}, {new:true}).exec()
        //수정 필요
        //deleteMany(update.image)
        return res.send({
            data: { 
                postingId: update._id,
                status: update.status
            },
            message: '게시물 삭제 완료'
        })
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }

    
}

export default deletePost;

