import User from '../../models/User.js';
import Posting from '../../models/Posting.js';
//favorite에 추가된 게시물이면 더 요청되지 않도록 에러 처리하기
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
        console.log('postingInfo', postingInfo)
        if(!postingInfo.likeUser.includes(userInfo.userId)) {
            const addFavorite = await User.findOneAndUpdate({_id:id}, {favorite: [...curFavorite, postingInfo]}, {upsert:true}).select('userId')
            console.log('addFavorite', addFavorite);

            if(addFavorite) { 
                await Posting.findByIdAndUpdate(postingId, {$inc:{likes:1}, likeUser: [...postingInfo.likeUser, addFavorite.userId]}, {new:true, upsert:true}) 
                return res.send('관심 게시물로 추가되었습니다.')
            }
        }
        return res.status(401).send('이미 추가된 게시물입니다.')
        //유저가 좋아요한 postingId로 게시물 정보를 찾아온다. 
        


    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
    
}

export default favorite;

//유저가 게시물 좋아요를 누르면 서버에 저장할 수 있도록 요청한다.
//받은 유저 아이디로 DB에서 유저를 찾는다. 
//유저가 기존에 좋아요 누른 favorite을 변수를 하나 선언해서 담아둔다.
//DB favorite에 기존에 좋아요를 담은 변수 + 새로 추가된 포스팅을 추가한다.

//좋아요 누르면 Posting collection에 likes도 1 증가해야한다. 