import User from '../../models/User.js';
import { checkType } from '../../utils/multer.js';
import { encryption } from '../../utils/setPwd.js';

const signup = async (req,res) => {
    const { userId, password } = req.body
    //console.log('req', req.file)
    //s3 버킷에 multer를 연동하면 location안에 경로가 들어가있다. 
    //선택사항이라 초기값을 빈문자열로
    let profileImg, type = ''  
    
    if(!userId || !password) {
        return res.status(400).send('필수 항목을 입력해주세요')
    } 

    if(req.file !== undefined) {
        profileImg = req.file.location
        type = req.file.mimetype.split('/')[1]

        if(!checkType(type)) {
            return res.status(400).send('잘못된 파일 형식입니다.')
        }
    }

    try {
        const pwd = encryption(password)

        if(!pwd) {
            return res.status(401).send('회원가입 실패')
        }

        const joinUser = await User.create({
            userId,
            password: pwd,
            profileImg
        })

        if(!joinUser) {
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
//유저가 이미 있는 경우


//회원 가입 할 때 img를 multer가 uploads 파일에 올리고
//그 경로를 서버에 넣고
//응답을 보낸다. 


//crypto.scryptSync() 함수는 password-based(암호-기반) key-derivation function(키-값 유도함수)다.
//필수인자 값으로 password, salt, keylen
//암호(password)에 소금 간(salt)좀 쳐 주고 키 길이 제한 넣어주면 
//키를 반환해주는 자판기 같은 놈이다. 