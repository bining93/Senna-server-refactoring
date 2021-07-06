import User from '../../models/User.js';
import { checkToken, getAccessToken } from '../../utils/tokenFunc.js';

const refreshtoken = async (req, res) => {
    const { refreshToken } = req.cookies;
    console.log('resfresh', refreshToken)

    if(!refreshToken) {
        res.status(400).send('refresh token not provided');
    } 

    try {
        const data = checkToken(refreshToken)
        console.log('data', data)
        if(!data) {
          return res.status(403).send('invalid refresh token, please log in again') 
        }

        const userInfo = await User.findById(data._id)
        if(!userInfo) {
            res.status(404).send('refresh token has been tempered')
        } else {
            const { _id, userId, favorite, profileImg, status } = userInfo;
            
            const accessToken = getAccessToken({ _id, userId, favorite, profileImg, status })
            res.send({            
                accessToken: accessToken,
                data: { _id, userId, favorite, profileImg, status }
            })
        }
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}
export default refreshtoken;