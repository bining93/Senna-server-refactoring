import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const kakaoLogin = async (req, res) => {
    const code = req.query.code;
    console.log('code', code)
    const url = 'http://localhost:3000/oauth/callback/kakao'
    try {
        const getToken = await axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_ID}&redirect_uri=${url}&code=${code}`,
            {'content-type': 'application/x-www-form-urlencoded'}
        )
        console.log('getToken', getToken.data)
        /*getToken {
        access_token: 'N8yj0gxbPUDUuAMP3yQXewZQWnG0usaXGUCshQo9dZoAAAF6deySxg',
        token_type: 'bearer',
        refresh_token: 'tr9WF90UktP_h-XKypY59k964CnAANnIcYbG_wo9dZoAAAF6deySxQ',
        expires_in: 21599,
        scope: 'account_email profile_image',
        refresh_token_expires_in: 5183999
        }
        */
       //토큰으로 유저 정보 카카오한테 요청하기
        const getUserInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${getToken.data.access_token}`,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        console.log('getUser', getUserInfo)

        //console.log('get', getUserInfo)
       //데이터 받아오면 DB에 User 데이터 생성하기

    } catch(err) {
        console.log(err)
    }

}

export default kakaoLogin;