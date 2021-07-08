import axios from 'axios';
import dotenv from 'dotenv';
import User from '../../models/User.js'
import Posting from '../../models/Posting.js';
import { getAccessToken, getRefreshToken } from '../../utils/tokenFunc.js';
dotenv.config();

const kakaoLogin = async (req, res) => {
    const { authorization } = req.headers;
    console.log('authorization', authorization)
    if(!authorization) {
        return res.status(400).send('토큰이 들어오지 않았습니다.')
    }
    try {
        //토큰으로 유저 정보 카카오한테 요청하기
        const getUserinfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, 
            { headers: {
                Authorization: authorization,
                'content-type': 'application/x-www-form-urlencoded',
            }
        })
        const profileImage = getUserinfo.data.properties.profile_image;
        const email = getUserinfo.data.kakao_account.email;
        const id = getUserinfo.data.id;
        // console.log("profile img: ", profile_img);
        // console.log("email: ", email);
        // console.log("id: ", id);

        //유저 찾기 or DB 저장 
        const userInfo = await User.findOrCreate({userId: email}, {profileImg: profileImage, socialId: id, provider:'kakao'});
        console.log('userInfo', userInfo)

        if(!userInfo) {
            return res.status(401).send('인식에 실패하였습니다.')
        }
        const { _id, userId, favorite, profileImg, status} = userInfo.doc
        //토큰 발급 받기
        const accessToken = getAccessToken({ _id, userId, favorite, profileImg, status })   
        const refreshToken = getRefreshToken({ _id, userId, favorite, profileImg, status })
        
        //Post에서 내가 쓴 글을 찾아온다.
        const findPosting = await Posting.find().where('userId').equals(userId)
        console.log('find', findPosting)

        // 생성된 refresh token을 쿠키에 담아줍니다
        res.cookie('refreshToken', refreshToken, {
          sameSite: 'none',
          secure: true, 
          httpOnly: true
        });
  
        res.status(200).send({
          userKey: _id, 
          userId: userId,
          favorite,
          profileImg,
          uploadList: findPosting,
          status,
          accessToken, 
          message: 'accessToken'
        });
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }

}

export default kakaoLogin;

