import User from '../../models/User.js';

const checkId = async (req, res) => {
    //아이디 중복확인
    const { id } = req.body;
    console.log('id', id)
    if(!id) {
        res.status(400).send('ID가 들어오지 않았습니다.')
    } else {
        await User.exists({userId: id})
        .then(data => {
            console.log('data', data)
            if(!data) {
                res.send({message: '사용할 수 있는 아이디입니다.'})
            }
            else res.status(401).send('이미 존재하는 아이디입니다.')    

        })
        .catch(err => {
            res.status(404).send('잘못된 요청입니다.')
            return err;
        })
    }  
}

export default checkId;