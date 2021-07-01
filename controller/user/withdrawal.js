import User from '../../models/User.js';
import { decryption } from '../../utils/setPwd.js';

const withdrawal = async (req,res) => {
    const { password } = req.body;
    const id = req.params.id;
    console.log('password', password)
    console.log('id', id)
    if(!password) {
        return res.status(400).send('비밀번호가 들어오지 않았습니다.')
    }

    try {
        const userInfo = await User.findById(id).select('password')
        console.log('userInfo', userInfo)
        
        let decrypt = decryption(userInfo.password)
        console.log('decr', decrypt)
        if(password !== decrypt) {
            return res.status(401).send('비밀번호를 확인해주세요.')
        }
        
        const setStatus = await User.findByIdAndUpdate(userInfo._id, { status: false })
        if(!setStatus) {
            return res.status(404).send('회원탈퇴에 실패했습니다.')
        }
        return res.send({message: '회원 탈퇴가 완료되었습니다.'})
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }


}

export default withdrawal