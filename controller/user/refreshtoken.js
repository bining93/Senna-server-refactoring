import User from '../../models/User.js';
import { getAccessToken } from '../../utils/tokenFunc.js';

const refreshtoken = async (req, res) => {
    try {
        const id = req.data._id

        const userInfo = await User.findById(id)
        if(!userInfo) return res.status(404).send('refresh token has been tempered')
    
        const { _id, userId, favorite, profileImg, status } = userInfo; 
        const accessToken = getAccessToken({ _id, userId })
        
        return res.send({            
            accessToken: accessToken,
            data: { _id, userId, favorite, profileImg, status }
        })
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}
export default refreshtoken;