import User from '../../models/User.js';

const signup = async (req,res) => {
    const { userId, password} = req.body
    //s3 버킷에 multer를 연동하면 location안에 경로가 들어가있다. 
    const profileImg  = req.file.location
    console.log('req.file', req.file)

    if(!userId || !password) {
        res.status(400).send('필수 항목을 입력해주세요')
    } else {
        await User.create({
            userId,
            password,
            profileImg
        })
        .then(data => {
            res.status(201).send('회원가입 성공!');
        })
        .catch(err => {
            console.log(err)
            res.status(404).send('회원가입 실패');
        })
    }
}

export default signup;
//유저가 이미 있는 경우



//회원 가입 할 때 img를 multer가 uploads 파일에 올리고
//그 경로를 서버에 넣고
//응답을 보낸다. 



