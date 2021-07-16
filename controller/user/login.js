import User from '../../models/User.js';
import { decryption } from '../../utils/setPwd.js';
import { getAccessToken, getRefreshToken } from '../../utils/tokenFunc.js';

//로그인 할 때 _id도 보내주는 걸루~
const login = async (req, res) => {
  console.log('req.headers', req.headers)
  const { userId, password } = req.body;
  console.log('userId, password', req.body)
  if(!userId || !password) {
    return res.status(400).send('필수요소를 넣어주세요.')
  }

  try {
    const userInfo = await User.findOne({userId: userId})
    //console.log('userInfo', userInfo)
    if(!userInfo) {
      return res.status(401).send('아이디를 확인해주세요');
    } 

    const decryptedPwd = decryption(userInfo.password);
    console.log('decry', decryptedPwd)

   if(userInfo.status === false){
      return res.status(404).send('존재하지 않는 유저입니다');
    } else if(decryptedPwd !== password) {
      return res.status(401).send('비밀번호를 확인해주세요');
    } else {
      // 일치하는 유저가 있을 경우
      // access token, refresh token 두가지를 생성
      const { _id, userId, favorite, profileImg, status } = userInfo;   
      const accessToken = getAccessToken({ _id, userId })   
      const refreshToken = getRefreshToken({ _id, userId })

      // 생성된 refresh token을 쿠키에 담아줍니다
      res.cookie('refreshToken', refreshToken, {
        sameSite: 'None',
        httpOnly: true,
        secure: true
      });

      if(favorite.length === 0) {
          return res.send({
              keyword: '',
              message: '좋아요 게시물 없음'
          })
      }

      let countArr = []
      let obj = {}
      favorite.map(info => info.hashtag).flat().forEach(el => {
        let toLower = el.toLowerCase()
      
        if(obj[toLower] === undefined) {
          obj[toLower] = 0
        } 
        obj[toLower]++
      })
      console.log('obj', obj)
    
      for(let [key, value] of Object.entries(obj)) {
        countArr.push({word: key, count: value})
      }
      countArr.sort((a,b) => b.count - a.count)

      console.log('countArr', countArr)

      return res.status(200).send({
        userKey: _id, 
        userId,
        favorite,
        profileImg,
        status,
        accessToken, 
        keyword: countArr[0].word,
        message: '로그인 되었습니다.'
      });
      
    }
  } catch(err) {
    res.status(err.status || 500).send(err.message || 'error')
  }

}

export default login;