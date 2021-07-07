import axios from 'axios';


const logout = async (req, res) => {
    const { authorization, kakaokey } = req.headers;
    const { refreshToken } = req.cookies;
    console.log('kakaokey', kakaokey)
    console.log(authorization)

    if(!authorization) {
        return res.status(400).send('token not provided')
    } else if(!kakaokey) {
        return res.status(400).send('kakaokey not provided')
    }
    
    try {
        delete req.headers.authorization;
        res.clearCookie('refreshToken');
        if (!kakaokey) {
            return res.status(205).send('로그아웃 되었습니다.');
        } 
        const kakaoLogout = await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {Authorization: `Bearer ${kakaokey}`})
        console.log('kakaoLogout', kakaoLogout)
        return res.status(205).send('카카오 로그아웃 되었습니다.');
        
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