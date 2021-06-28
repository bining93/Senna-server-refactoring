import User from '../../models/User.js';

const signup = async (req,res) => {
    
    const { userId, password, profileImage } = req.body

    const createUser = await User.create({
        userId,
        password,
        profileImage
    })

    if(!createUser){
        res.status(404).send('회원가입 실패');
    } else {
        res.status(201).send('회원가입 성공!');
    }
}

export default signup;
//유저가 이미 있는 경우



//회원 가입 할 때 img를 multer가 uploads 파일에 올리고
//그 경로를 서버에 넣고
//응답을 보낸다. 



