import User from '../../models/User.js';

const checkId = async (req, res) => {
    const { id } = req.body;

    if(!id) {
        return res.status(400).send('ID가 들어오지 않았습니다.')
    } 
    
    try {
        // * Id의 DB 존재 유무 *
        const isUser = await User.exists({userId: id})

        if(!isUser) {
            return res.send('사용가능한 ID입니다.')
        } else {
            return res.status(401).send('이미 존재하는 ID입니다.')   
        }

    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}

export default checkId;