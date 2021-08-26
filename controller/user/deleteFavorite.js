import User from '../../models/User.js';
import Posting from '../../models/Posting.js';
//req.params.id에 _id가 아닌 다른 값이 들어오는 경우..
const deleteFavorite = async (req, res) => {
    const userId = req.params.id;
    const { postingId } = req.body;

    if(!postingId) {
        return res.status(400).send('필수요소가 들어오지 않았습니다.')
    } 
    
    try {
        const nowFavorite = await User.findById(userId).select('favorite').exec()

        if(!nowFavorite) {
            return res.status(404).send('추가된 게시물이 아닙니다.')
        }

        // * 삭제할 게시물 제외 *
        const newFavorite  = nowFavorite.favorite.filter((post) => post._id.toString() !== postingId)
        const update = await User.findByIdAndUpdate(userId, {favorite: newFavorite}, {new:true}).exec()      

        if(update) {
            // * 게시물 좋아요 누른 유저 배열에서 해당 유저 제외 *
            const nowlike = await Posting.findById(postingId).select('likeUser') 
            let updateLike = nowlike.likeUser.filter(el => el !== update.userId)
            await Posting.findByIdAndUpdate(postingId, {$inc:{likes:-1}, likeUser: updateLike}, {new:true})
            
            return res.send({ 
                favorite: update.favorite,
                userId: update.userId,
                message: '관심 게시글이 삭제되었습니다.'
            })
        }
       
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}

export default deleteFavorite;


