import User from '../../models/User.js';
import { decryption } from '../../utils/setPwd.js';
import s3 from '../../config/s3.js'

const withdrawal = async (req,res) => {
    const { password } = req.body;
    const id = req.params.id;
    console.log('password', password)
    console.log('id', id)
    if(!password) {
        return res.status(400).send('필수요소가 들어오지 않았습니다.')
    }

    try {
        const userInfo = await User.findById(id).select('password profileImg')
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

        const oldImg = userInfo.profileImg.split('com/')[1];
        s3.deleteObject({
            Bucket: 'senna-image',
            Key: oldImg
        }, (err, data) => {
            if(err) {
                console.log(err)
            }
            console.log('프로필 이미지 삭제', data)
        });

        return res.send({message: '회원 탈퇴가 완료되었습니다.'})
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }


}

export default withdrawal

//회원 탈퇴할 시에 s3에서 유저 프로필 삭제하기.