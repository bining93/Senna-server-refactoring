import User from '../../models/User.js';
import Posting from '../../models/Posting.js';

const favorite = async (req, res) => {
    const id = req.params.id;
    const { postingId } = req.body;

    if(!postingId) {
        res.status(400).send('필수 요소가 들어오지 않았습니다.')
    } else {
        await User.findById(id).exec()
        .then(data => {
            console.log('data', data)
            if(!data || !data.status) {
                res.status(401).send('존재하지 않는 유저입니다.')
            } else {
                let curFavorite = data.favorite || []
                User.updateOne({_id:id}, {favorite: [...curFavorite, postingId]}, {upsert:true})
                .then(result => {
                    console.log('result', result)
                    res.send('좋아요한 게시물이 추가되었습니다.')
                    return Posting.findByIdAndUpdate(postingId, {$inc:{likes:1}}, {new:true})
                })
                .then(like => {
                    console.log('like', like)
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send('서버에러?')
        })
    }
}

export default favorite;

//유저가 게시물 좋아요를 누르면 서버에 저장할 수 있도록 요청한다.
//받은 유저 아이디로 DB에서 유저를 찾는다. 
//유저가 기존에 좋아요 누른 favorite을 변수를 하나 선언해서 담아둔다.
//DB favorite에 기존에 좋아요를 담은 변수 + 새로 추가된 포스팅을 추가한다.

//좋아요 누르면 Posting collection에 likes도 1 증가해야한다. 