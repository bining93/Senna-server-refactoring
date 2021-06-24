const { urlencoded } = require('express');
const { User } = require('../../models');
const { Category } = require('../../models');
const { user_category} = require('../../models');

module.exports = async (req,res) => {
    
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



