import User from '../../models/User.js';
//정의되지 않은 스키마
//const { Category } = require('../../models');
//const { user_category} = require('../../models');

const signup = async (req, res) => {
    const { userId, password, profileImage } = req.body
    //일반회원가입 , 소셜회원가입
    const createUser = await User.create({
        userId,
        password,
        profileImage,
        favorite,
        status : true,
    })

    if(!createUser){
        res.status(404).send('회원가입 실패');
    } else {
        res.status(201).send('회원가입 성공!');
    }
}

export default signup;



