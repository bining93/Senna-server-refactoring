import User from '../../models/User.js';
import jwt from 'jsonwebtoken';

const info = async (req, res) => {
    //req 헤더의 authorization에 access token이 담겨온다.
    const { authorization } = req.headers;
    
    if (!authorization) {
        // 일치하는 유저가 없을 경우
        res.status(400).send('잘못된 접근 방식입니다');
    } else {
        const token = authorization.split(' ')[1]
        const data = jwt.verify( token, process.env.ACCESS_SECRET, {
            expiresIn: '1h',
        });
        //const refreshToken = jwt.sign({ userid, profileImage, favorite }, process.env.REFRESH_SECRET, {
        //  expiresIn: '10h',
        //});
        //// 생성된 refresh token을 쿠키에 담아줍니다
        //res.cookie('refreshToken', refreshToken, {
        //  sameSite: 'none',
        //  secure: true, 
        //  httpOnly: true
        //});
        res.status(200).send({ 
            data: { 
                id, 
                user_id, 
                favorites: [{ 
                    posting_id,
                    image,
                    content,
                    hashtag,
                    created_date,
                    status}],
                profile_img 
            } 
        });
    }
}

export default info;



