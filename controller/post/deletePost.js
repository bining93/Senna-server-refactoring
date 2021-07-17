import Posting from '../../models/Posting.js';
import { deleteMany } from '../../utils/multer.js';

const deletePost = async (req, res) => {
    if(!req.params) {
        return res.status(400).send('잘못된 요청입니다.')
    }
    try {
        const postingId = req.params.id;
        console.log('postingId')
        const update = await Posting.findByIdAndUpdate(postingId, {status: false}, {new:true}).exec()
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

//삭제가 되어야할 게시물 id를 path param으로 받는다. 
//Post collection에서 맞는 doc를 찾아 status를 false로 변경한다. 
//