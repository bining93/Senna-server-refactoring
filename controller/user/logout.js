import axios from 'axios';
import User from '../../models/User.js';

const logout = async (req, res) => {
    const { kakaokey } = req.headers;
    
    try {
        const id = req.data._id
        const findUser = await User.findById(id)
        if(!findUser) return res.status(404).send('일치하는 유저가 없습니다.')
        
        // * 헤더와 쿠키에서 토큰 삭제 *
        delete req.headers.authorization
        res.clearCookie('refreshToken')

        if (!kakaokey) {
            // * 일반 유저 *
            return res.status(205).send('로그아웃 되었습니다.');
        } else if(kakaokey) {
            // * social 유저 *
            const kakaoLogout = await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {headers: {Authorization: `${kakaokey}`}})
            return res.status(205).send('카카오 로그아웃 되었습니다.');
        }
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }

}

export default logout;
