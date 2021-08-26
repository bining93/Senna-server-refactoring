import User from '../../models/User.js';
import { checkType, deleteOne } from '../../utils/multer.js';
import { encryption } from '../../utils/setPwd.js';

const signup = async (req,res) => {
    const { userId, password } = req.body
    let profileImg, type = ''  

    if(!userId || !password || userId === 'undefined' || password === 'undefined') {
        return res.status(400).send('필수 항목을 입력해주세요')
    } 
    
    if(req.file !== undefined) {
        profileImg = req.file.location
        type = req.file.mimetype.split('/')[1]
 
        if(!checkType(type)) {
            deleteOne(profileImg)
            return res.status(400).send('잘못된 파일 형식입니다.')
        }
    }

    try {
        // * 패스워드 암호화 *
        const encryptionPwd = encryption(password)
        const joinUser = await User.create({
            userId,
            password: encryptionPwd,
            profileImg
        })

        if(!joinUser) {
            deleteOne(profileImg)
            return res.status(401).send('회원가입 실패')
        }
        
        return res.status(201).send({
            id: joinUser._id,
            message: '회원가입 성공!'
        });
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}

export default signup;