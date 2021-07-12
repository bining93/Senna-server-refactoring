import axios from 'axios';
import { checkToken } from '../../utils/tokenFunc.js';

const logout = async (req, res) => {
    const { authorization, kakaokey } = req.headers;
    console.log('kakaokey', kakaokey) 
    console.log(authorization)

    if(!authorization) {
        return res.status(400).send('token not provided')
    } 
    
    try {
        const token = authorization.split(' ')[1]
        const check = checkToken(token)
        console.log('token', check)
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

/*
if (req.headers.authorization || req.cookies.Authorization) {
    delete req.headers.authorization;
    res.clearCookie('Authorization');
    res.status(205).send({ message: 'logout success' });
} else {
}
*/

//H8SL0row7bfMvV5BGITibb2llfrox2Im-h2BhworDNIAAAF6f9mofQ