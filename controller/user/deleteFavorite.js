import User from '../../models/User.js';
import Posting from '../../models/Posting.js';
//req.params.id에 _id가 아닌 다른 값이 들어오는 경우..
const deleteFavorite = async (req, res) => {
    const userId = req.params.id;
    const { postingId } = req.body;

    if(!postingId) {
        return res.status(400).send('postingId가 들어오지 않았습니다.')
    } 
    
    try {
        const nowFavorite = await User.findById(userId).select('favorite').exec()

        if(!nowFavorite) {
            return res.status(401).send('찾을 수 없는 유저입니다.')
        }
        //삭제할 postingId 뺀 favorite 배열 
        const newFavorite  = nowFavorite.favorite.filter((post) => post._id.toString() !== postingId)
        console.log('newFavorite', newFavorite)
        
        const update = await User.findByIdAndUpdate(userId, {favorite: newFavorite}, {new:true}).exec()      
        console.log('update', update)
        if(update) {
            //like -1
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

//유저가 관심 게시물 삭제하면 유저 favorite에서 게시물 id 삭제 
//유저 id로 User collection에서 맞는 doc를 찾아 favorite 키만 가져온다. 
//게시물 like -1 하기 

