import User from '../../models/User.js';
import Posting from '../../models/Posting.js';

const deleteFavorite = async (req, res) => {
    const userId = req.params.id;
    const { postingId } = req.body;

    if(!postingId) {
        return res.status(400).send('postingId를 보내주세요.')
    } 
    
    try {
        const nowFavorite = await User.findById(userId).select('favorite').exec()
        console.log('favorite', nowFavorite)

        if(!nowFavorite.favorite.includes(postingId)) {
            return res.status(404).send('favorite에 추가된 게시물이 아닙니다.')
        }

        //삭제할 postingId 뺀 favorite 배열 
        const newFavorite = nowFavorite.favorite.filter(post => post !== postingId)
        console.log('newFavorite', newFavorite)
        const update = await User.findByIdAndUpdate(userId, {favorite: newFavorite}, {new:true}).exec()      
        console.log('update', update)
        if(update) {
            //like -1
            await Posting.findByIdAndUpdate(postingId, {$inc:{likes: -1}})
            
            return res.send({
                data: {
                    favorite: update.favorite,
                    userId: update.userId
                },
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

