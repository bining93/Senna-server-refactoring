import User from '../../models/User.js';
import Posting from '../../models/Posting.js';
import jwt from 'jsonwebtoken';

const info = async (req, res) => {
    //req 헤더의 authorization에 access token이 담겨온다.
    const { authorization } = req.headers;
    console.log(authorization)

    if (!authorization) {
        // 일치하는 유저가 없을 경우
        return res.status(400).send('잘못된 접근 방식입니다');
    } 
    
    try {
        const token = authorization.split(' ')[1]
        //유저 정보로 만들어서 
        const data = jwt.verify( token, process.env.TOKEN_SECRET, {
            expiresIn: '1h',
        });
        console.log('data', data._id
        )
        const userInfo = await User.findById(data._id)

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


