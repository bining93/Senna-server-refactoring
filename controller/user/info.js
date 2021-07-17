import User from '../../models/User.js';
import Posting from '../../models/Posting.js';

const info = async (req, res) => {    
 
    try {
        const id = req.data._id
        const userInfo = await User.findOne({_id:id})
        // * 좋아요 게시물 최신순으로 정렬 * 
        const sortFavorite = userInfo.favorite.sort((a,b) => b.created_at - a.created_at)

        if(!userInfo) {
            return res.status(404).send('일치하는 유저가 없습니다.')
        }
        const { _id, userId, profileImg } = userInfo
        const uploadList = await Posting.find().where('userId').equals(userId)

        res.status(200).send({ 
            data: { _id, userId, profileImg, favorite:sortFavorite, uploadList }
        });
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}

export default info;


