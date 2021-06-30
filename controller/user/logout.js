const logout = (req, res) => {
    const { authorization } = req.headers;

    console.log(authorization)
    if(!authorization) {
        res.status(400).send('잘못된 접근방식입니다')
    } else {
        if (req.headers.authorization || req.cookies.refreshToken) {
            delete req.headers.authorization;
            res.clearCookie('refreshToken');
            res.status(205).send('로그아웃 되었습니다.');
        }
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