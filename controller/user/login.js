import User from '../../models/User.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {

  const { userId, password } = req.body

  const userInfo = await User.findOne(
    {
      userId: userId,
      password: password,
    }
  );

  console.log('userInfo', userInfo)
  if (!userInfo) {
    // 일치하는 유저가 없을 경우
    res.status(401).send('아이디와 비밀번호를 확인해주세요');
  } else if(!userInfo.status) {
    res.status(404).send('존재하지 않는 유저입니다');
  } else {
    // 일치하는 유저가 있을 경우
    // access token, refresh token 두가지를 생성
    const { userid, profileImage, favorite } = userInfo;
    const accessToken = jwt.sign({ userid, profileImage, favorite }, process.env.ACCESS_SECRET, {
      expiresIn: '1h',
    });

    // const refreshToken = jwt.sign({ userid, profileImage, favorite }, process.env.REFRESH_SECRET, {
    //   expiresIn: '10h',
    // });
    // // 생성된 refresh token을 쿠키에 담아줍니다
    // res.cookie('refreshToken', refreshToken, {
    //   sameSite: 'none',
    //   secure: true, 
    //   httpOnly: true
    // });
    res.status(200).send({
      data: {
        accessToken
      }, 
      message: 'accessToken'
    });
  }
}

export default login;



