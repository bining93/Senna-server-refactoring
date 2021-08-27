import User from '../../models/User.js';
import Posting from '../../models/Posting.js';

const favorite = async (req, res) => {
    const id = req.params.id;
    const { postingId } = req.body;

    if(!postingId) {
       return res.status(400).send('필수 요소가 들어오지 않았습니다.')
    } 
    
    try {
        
        let userInfo = await User.findById(id).exec()

        if(!userInfo || !userInfo.status) {
            return res.status(401).send('존재하지 않는 유저입니다.')
        }
        
        let curFavorite = userInfo.favorite || {}
        const postingInfo = await Posting.findById(postingId)

        // * 관심 게시물 추가 *
        if(!postingInfo.likeUser.includes(userInfo.userId)) {
            const addFavorite = await User.findOneAndUpdate({_id:id}, {favorite: [postingInfo, ...curFavorite]}, {upsert:true}).select('userId')

            if(addFavorite) { 
                await Posting.findByIdAndUpdate(postingId, {$inc:{likes:1}, likeUser: [...postingInfo.likeUser, addFavorite.userId]}, {new:true, upsert:true}) 
                return res.send('관심 게시물로 추가되었습니다.')
            }
        }
        return res.status(401).send('이미 추가된 게시물입니다.') 

    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
    
}

export default favorite;
