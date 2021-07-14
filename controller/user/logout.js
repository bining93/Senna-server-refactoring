import axios from 'axios';
import User from '../../models/User.js';

const logout = async (req, res) => {
    const { kakaokey } = req.headers;
    console.log('kakaokey', kakaokey) 
    
    try {
        console.log('token!!!!', req.data)
        const id = req.data._id
        const findUser = await User.findById(id)
        if(!findUser) return res.status(404).send('일치하는 유저가 없습니다.')
        
        delete req.headers.authorization;
        console.log('author', req.headers.authorization)
        res.clearCookie('refreshToken');
        if (!kakaokey) {
            return res.status(205).send('로그아웃 되었습니다.');
        } else if(kakaokey) {
            const kakaoLogout = await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {headers: {Authorization: `${kakaokey}`}})
            console.log('kakaoLogout', kakaoLogout)
            return res.status(205).send('카카오 로그아웃 되었습니다.');
        }
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }

}

export default logout;
