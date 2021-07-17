import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getAccessToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
    });
}

const getRefreshToken = (data) => {
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d',
    });
}

const checkAccessToken = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization)
    const token = authorization && authorization.split(' ')[1]
    console.log('token', token)
    if(token === undefined) return res.status(400).send('access token을 확인할 수 없습니다.');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, info) => {
        if(err) return res.status(401).send('만료된 토큰입니다.')
        console.log('info', info)
        //다음 미들웨어로 데이터 넘기기
        req.data = info
        next()
    });

}

const checkRefreshToken = (req, res, next) => {
    const { refreshToken } = req.cookies;
    console.log('resfresh', refreshToken)

    if(!refreshToken) return res.status(400).send('refresh token을 확인할 수 없습니다.');

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, info) => {
        if(err) return res.status(401).send('만료된 토큰입니다. 다시 로그인해주세요.') 
        req.data = info
        next()
    });
}

export {getAccessToken, getRefreshToken, checkAccessToken, checkRefreshToken}