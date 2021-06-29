import User from '../../models/User.js';
import jwt from 'jsonwebtoken';

const info = async (req, res) => {
    //req 헤더의 authorization에 access token이 담겨온다.
    
    const { authorization } = req.headers;
    console.log(authorization)
    if (!authorization) {
        // 일치하는 유저가 없을 경우
        res.status(400).send('잘못된 접근 방식입니다');
    } else {
        const token = authorization.split(' ')[1]
        //유저 정보로 만들어서 
        const data = jwt.verify( token, process.env.TOKEN_SECRET, {
            expiresIn: '1h',
        });
        console.log('data', data._id
        )
        const userInfo = await User.findById(data._id)
        const { _id, favorite, userId, profileImg } = userInfo
        
        res.status(200).send({ 
            data: { _id, favorite, userId, profileImg }
        });
    }
}

export default info;


