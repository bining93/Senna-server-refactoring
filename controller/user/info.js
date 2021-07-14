import User from '../../models/User.js';
import Posting from '../../models/Posting.js';

const info = async (req, res) => {    
    try {
        const id = req.data._id
        const userInfo = await User.findById(id)
    
        if(!userInfo) {
            return res.status(404).send('일치하는 유저가 없습니다.')
        }
        const { _id, favorite, userId, profileImg } = userInfo
        
        //Post에서 내가 쓴 글을 찾아온다.
        const findPosting = await Posting.find().where('userId').equals(userId)
        console.log('find', findPosting)

        res.status(200).send({ 
            data: { _id, favorite, userId, profileImg, uploadList:findPosting }
        });
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}

export default info;


