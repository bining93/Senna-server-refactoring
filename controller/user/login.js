import User from '../../models/User.js';
import { decryption } from '../../utils/setPwd.js';
import { getAccessToken, getRefreshToken } from '../../utils/tokenFunc.js';

//로그인 할 때 _id도 보내주는 걸루~
const login = async (req, res) => {
  const { userId, password } = req.body;

  if(!userId || !password) {
    return res.status(400).send('필수요소를 넣어주세요.')
  }

  try {
    const userInfo = await User.findOne({userId: userId})
    if(!userInfo) {
      return res.status(401).send('아이디를 확인해주세요');
    } 

    // * 패스워드 복호화 *
    const decryptedPwd = decryption(userInfo.password);

   if(userInfo.status === false){
      return res.status(404).send('존재하지 않는 유저입니다');
    } else if(decryptedPwd !== password) {
      return res.status(401).send('비밀번호를 확인해주세요');
    } else {
 
      const { _id, userId, favorite, profileImg, status } = userInfo;   
      const accessToken = getAccessToken({ _id, userId })   
      const refreshToken = getRefreshToken({ _id, userId })

      res.cookie('refreshToken', refreshToken, {
        sameSite: 'None',
        httpOnly: true,
        secure: true
      });

      if(favorite.length === 0) {
        return res.send({
          userKey: _id, 
          userId,
          favorite,
          profileImg,
          status,
          accessToken, 
          keyword: '',
          message: '좋아요 게시물 없음'
        })
      }


      // * 유저 추천 키워드 *
      let countArr = []
      let obj = {}
      favorite.map(info => info.hashtag).flat().forEach(el => {
        let toLower = el.toLowerCase()
      
        if(obj[toLower] === undefined) {
          obj[toLower] = 0
        } 
        obj[toLower]++
      })
    
      for(let [key, value] of Object.entries(obj)) {
        countArr.push({word: key, count: value})
      }
      countArr.sort((a,b) => b.count - a.count)

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