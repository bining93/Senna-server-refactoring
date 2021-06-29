import User from '../../models/User.js';
import Posting from '../../models/Posting.js';

const deleteFavorite = async (req, res) => {
    const userId = req.params.id;
    const { postingId } = req.body;

    if(!postingId) {
        res.status(400).send('postingId를 보내주세요.')
    } else {
           //userId에 맞는 doc에서 favorite 컬럼만 가져온다.
    await User.findById(userId).select('favorite').exec()
    .then(data => {    
        //삭제할 postingId 제외한 새 배열
        const update = data.favorite.filter(el => el !== postingId)

        //favorite 수정
        return User.findByIdAndUpdate(userId, {favorite: update}, {new:true})
    })
    .then(data => {
        res.send({
            data: {
                favorite: data.favorite,
                userId: data.userId
            },
            message: '관심 게시글이 삭제되었습니다.'
        })
    })
    .catch(err => {
        console.log(err)
    })

    //like -1
    await Posting.findByIdAndUpdate(postingId, {$inc:{likes: -1}}).exec()
    }

 
}

export default deleteFavorite;

//유저가 관심 게시물 삭제하면 유저 favorite에서 게시물 id 삭제 
//유저 id로 User collection에서 맞는 doc를 찾아 favorite 키만 가져온다. 
//게시물 like -1 하기 

