import { User } from '../../models/User.js';
const jwt = require('jsonwebtoken');

const refreshtoken = async (req, res) => {
    const { refreshToken } = req.cookies;
    console.log('resfresh', refreshToken)
    if(!refreshToken) {
        res.status(400).send('refresh token not provided');
    } else {
        const data = jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
            if(err) {
                res.status(403).send('invalid refresh token, please log in again')
            } else {
                return decoded
            }
        }) 

        const userInfo = await User.findOne({
            userId: data.userId
        })
        if(!userInfo) {
            res.status(404).send('refresh token has been tempered')
        } else {
            const { _id, userId, favorite, profileImg, status } = userInfo;
            const accessToken = jwt.sign({ _id, userId, favorite, profileImg, status }, process.env.ACCESS_SECET)
            res.send({            
                accessToken: accessToken,
                userInfo: { _id, userId, favorite, profileImg, status }
            })
        }
    }
}
export default refreshtoken;