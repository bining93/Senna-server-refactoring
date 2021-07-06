import axios from 'axios';
import dotenv from 'dotenv';
import User from '../../models/User.js'
dotenv.config();

const kakaoLogin = async (req, res) => {
    const { authorization } = req.headers;
    console.log('authorization', authorization)

    try {

        //토큰으로 유저 정보 카카오한테 요청하기
        const getUserinfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, 
            { headers: {
                Authorization: authorization,
                'content-type': 'application/x-www-form-urlencoded',
            }
        })
        const profile_img = getUserinfo.data.properties.profile_image;
        const email = getUserinfo.data.kakao_account.email;
        const id = getUserinfo.data.id;
        // console.log("profile img: ", profile_img);
        // console.log("email: ", email);
        // console.log("id: ", id);

        //유저 찾기
        const userInfo = await User.findOne({userId: email});
        console.log(userInfo);
        if(!userInfo) {
            //가입 안되었을 때
            const newUserinfo = await User.create({
                userId: email,
                profileImg: profile_img,
                socialId: id,
                provider: "kakao"
            })
            res.send({userId:email, profileImg: profile_img, userKey: newUserinfo._id, favorite: userInfo.favorite})
        }else{
            res.send({userId:email, profileImg: profile_img, userKey: userInfo._id, favorite: userInfo.favorite})
        }
        
        //데이터 받아오면 DB에 User 데이터 생성하기
        
    } catch(err) {
        console.log(err)
    }

}

export default kakaoLogin;