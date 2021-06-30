import User from '../../models/User.js';

const checkId = async (req, res) => {
    //아이디 중복확인
    const { id } = req.body;
    console.log('id', id)
    if(!id) {
        return res.status(400).send('ID가 들어오지 않았습니다.')
    } 
    
    try {
        const isUser = await User.exists({userId: id})
        console.log(isUser);
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