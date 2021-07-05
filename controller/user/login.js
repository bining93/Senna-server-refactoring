import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import { decryption } from '../../utils/setPwd.js';
//로그인 할 때 _id도 보내주는 걸루~
const login = async (req, res) => {

  const { userId, password } = req.body;
  
  //const Users = mongoose.model('User', User.userSchema);
  if(!userId || !password) {
    res.status(400).send('필수요소를 넣어주세요.')
  }

  try {

  } catch(err) {
    const userInfo = await User.findOne({userId: userId})
  }
  await User.findOne({
    userId: userId
  }).then((data) => {
    const decryptedPwd = decryption(data.password);
    if(!data) {
        res.status(401).send('아이디를 확인해주세요');
    }else if(data.status === false){
        res.status(404).send('존재하지 않는 유저입니다');
    }else if(decryptedPwd !== password) {
        res.status(401).send('아이디와 비밀번호를 확인해주세요');
    }else {
        // 일치하는 유저가 있을 경우
        // access token, refresh token 두가지를 생성
        const { _id, userId, favorite, profileImg, status } = data;
        const accessToken = jwt.sign({ _id, userId, favorite, profileImg, status }, process.env.TOKEN_SECRET, {
          expiresIn: '1h',
        });
        const refreshToken = jwt.sign({ _id, userId, favorite, profileImg, status }, process.env.TOKEN_SECRET, {
          expiresIn: '10h',
        });
        // 생성된 refresh token을 쿠키에 담아줍니다
        res.cookie('refreshToken', refreshToken, {
          sameSite: 'none',
          secure: true, 
          httpOnly: true
        });
        if(!accessToken && !refreshToken) {

        }
        res.status(200).send({
          userKey: _id, 
          userId: userId,
          favorite,
          profileImg,
          status,
          accessToken, 
          message: 'accessToken'
        });
      }

  })

}

export default login;