import User from '../../models/User.js';

const signup = async (req, res) => {
    const { userId, password, profileImag } = req.body
  
    const createUser = await User.create({
        userId,
        password,
        profileImag
    })

    if(!createUser){
        res.status(404).send('회원가입 실패');
    } else {
        res.status(201).send('회원가입 성공!');
    }
}

export default signup;



