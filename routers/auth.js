import { Router } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as KakaoStrategy } from "passport-kakao";
import social from '../controller/social/index.js';
import User from '../models/User.js';

const router = Router();
dotenv.config();

const url = 'http://localhost:80'

/*
passport.use(new KakaoStrategy({
    clientID : process.env.KAKAO_ID,
    callbackURL : `${url}/auth/kakao/callback`
},
async (accessToken, refreshToken, profile, cb) => {
    //성공했을 때 액션 
    //사용자 정보는 profile에 들어있음
    console.log('accessTk', accessToken)
    console.log('refreshTk', refreshToken)
    console.log('profile', profile)
    
    const {
        id,
        provider,
        _json: {
          properties: { profile_image },
          kakao_account: { email },
        },
    } = profile;
    //kakao로 부터 받아온 유저 정보를 DB에 저장하기 
    try{
        const userInfo = await User.findOne({userId: email})
        if(userInfo) {
            //있으면 어떻게 처리??
            userInfo.socialId = id
            //userInfo.save()
            return cb(null, userInfo)
        } 
        //없을때는 DB저장
        const newUser = await User.create({
            userId: email,
            socialId: id,
            profileImg: profile_image,
            provider: provider
        }) 
        return cb(null, newUser)
    } catch(err) {
        return cb(err)
    }

}
))

passport.serializeUser(function (user, cb) {
    console.log(`user : ${user.profile}`)
    cb(null, user)
})
passport.deserializeUser(function (obj, cb) {
    console.log(`obj : ${obj}`)
    cb(null, obj)
})
*/
//사용자의 로그인 요청 받고 카카오 서버에 로그인 보내는 라우터
//router.get('/kakao', passport.authenticate('kakao'))

//카카오 서버로 로그인 정보를 받는 라우터 (여기서 res를 보내줌)
//router.get('/kakao/callback', passport.authenticate('kakao', {
//    failureRedirect: '/'
//}), (req,res) => {
//    res.redirect('http://localhost:3000')
//})

router.get('/callback/kakao', social.kakaoLogin);
export default router;

/* 정보
GET /auth/kakao/callback?code=WrK0d854MP9Uq9Wm0saBr_QC3k7N0ZseQivlXm1SnpRPFlkHgfTbxs_RNCt4Mq9COD8i7AopyNoAAAF6dA4IOA - - ms - -
accessTk H10x69itlb5BYXIKOJ-RKXzA5PqkcRAvpz7VYwopb9UAAAF6dA72TQ
refreshTk AlRmfL96FpfFIsuFrLojL0BdvlSRL9t64R4pOgopb9UAAAF6dA72TA
profile {
  provider: 'kakao',
  id: 1794466773,
  username: undefined,
  displayName: undefined,
  _raw: '{"id":1794466773,"connected_at":"2021-07-05T00:25:15Z","properties":{"profile_image":"http://k.kakaocdn.net/dn/yDAvF/btqTLyijxUz/5CkGe5FfUBxA2r2AKUBXS0/m1.jpg","thumbnail_image":"http://k.kakaocdn.net/dn/yDAvF/btqTLyijxUz/5CkGe5FfUBxA2r2AKUBXS0/p1.jpg"},"kakao_account":{"profile_image_needs_agreement":false,"profile":{"thumbnail_image_url":"http://k.kakaocdn.net/dn/yDAvF/btqTLyijxUz/5CkGe5FfUBxA2r2AKUBXS0/p1.jpg","profile_image_url":"http://k.kakaocdn.net/dn/yDAvF/btqTLyijxUz/5CkGe5FfUBxA2r2AKUBXS0/m1.jpg","is_default_image":false},"has_email":true,"email_needs_agreement":false,"is_email_valid":true,"is_email_verified":true,"email":"dlgpqls30@naver.com"}}',
  _json: {
    id: 1794466773,
    connected_at: '2021-07-05T00:25:15Z',
    properties: {
      profile_image: 'http://k.kakaocdn.net/dn/yDAvF/btqTLyijxUz/5CkGe5FfUBxA2r2AKUBXS0/m1.jpg',
      thumbnail_image: 'http://k.kakaocdn.net/dn/yDAvF/btqTLyijxUz/5CkGe5FfUBxA2r2AKUBXS0/p1.jpg'
    },
    kakao_account: {
      profile_image_needs_agreement: false,
      profile: [Object],
      has_email: true,
      email_needs_agreement: false,
      is_email_valid: true,
      is_email_verified: true,
      email: 'dlgpqls30@naver.com'
    }
  }
}
*/