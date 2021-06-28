const logout = (req, res) => {
    const { accessToken } = req.body;

    if(!accessToken) {
        res.status(400).send('잘못된 접근방식입니다')
    } else {
        res.status(200).send('successfully logged out')
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