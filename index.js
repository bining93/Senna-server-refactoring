import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import userRouter from './routers/user.js';
import postRouter from'./routers/post.js';
import DBconnect from './config/connect.js'
import User from './models/User.js';
import Posting from './models/Posting.js';

const app = express();
const port = 80;
//mongoDB 연결 시키기 
DBconnect();

app.use(cors({
    origin: true,
    methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    credentials: true
}));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//테스트용
app.get('/', (req,res) => {
    console.log('연결 성공')
    res.send('Hello SENNA!!!')
})

//User post
app.post("/register", (req, res) => {
    // User 데이터 모델과 연결된 객체 생성 후 req.body 삽입
    const user = new User(req.body);
  
    // save 메서드를 통해 원격 저장소에 데이터 저장.
    user.save((err, userInfo) => {
      // 에러면 false 반환
      if (err) return res.json({ suceess: false, err });
      // 성공적이면 200 상태 코드 날리고 true 값 돌려주기
      return res.status(200).send(userInfo);
    });
});

//Posting post
app.post("/regi", (req, res) => {
  // User 데이터 모델과 연결된 객체 생성 후 req.body 삽입
  const posting = new Posting(req.body);

  // save 메서드를 통해 원격 저장소에 데이터 저장.
  posting.save((err, posting) => {
    // 에러면 false 반환
    if (err) return res.json({ success: false, err });
    // 성공적이면 200 상태 코드 날리고 true 값 돌려주기
    console.log('posting', posting)
    return res.status(200).send(posting);
  });
});

//라우터 연결
app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});