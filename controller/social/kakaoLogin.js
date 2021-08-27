import axios from 'axios';
import dotenv from 'dotenv';
import User from '../../models/User.js'
import Posting from '../../models/Posting.js';
import { getAccessToken, getRefreshToken } from '../../utils/tokenFunc.js';
dotenv.config();

const kakaoLogin = async (req, res) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(400).send('잘못된 접근 방식입니다.')
    }
    try {
        // * kakao api로 유저 정보 요청 * 
        const getUserinfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, 
            { headers: {
                Authorization: authorization,
                'content-type': 'application/x-www-form-urlencoded',
            }
        })
        const profileImage = getUserinfo.data.properties.profile_image;
        const email = getUserinfo.data.kakao_account.email;
        const kakaoId = getUserinfo.data.id;

        // * DB에서 유저 찾기 or 생성 *
        const userInfo = await User.findOrCreate({userId: email}, {profileImg: profileImage, socialId: kakaoId, provider:'kakao'})
        if(!userInfo) {
            return res.status(401).send('인식에 실패하였습니다.')
        }
        
        const { _id, userId, favorite, profileImg, status} = userInfo.doc
        
        // * 토큰 발급 *
        const accessToken = getAccessToken({ _id, userId })   
        const refreshToken = getRefreshToken({ _id, userId })
        
        // * 유저가 작성한 게시글 찾기 *
        const uploadList = await Posting.find().where('userId').equals(userId).sort('-created_at');

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
          uploadList,
          status,
          accessToken, 
          message: '카카오 로그인 성공'
        });
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }

}

export default kakaoLogin;


//프로필 사진 바뀌면 같이 바뀌도록 만들기
