import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import DBconnect from './config/connect.js'
import userRouter from './routers/user.js';
import postRouter from'./routers/post.js';
import searchRouter from './routers/search.js';
import authRouter from './routers/auth.js';


const app = express();
const port = 80;

//mongoDB 연결 시키기 
DBconnect();

app.use(cors({
    origin: ['http://localhost:3000', 'https://www.senna.world', 'https://senna.world'],
    methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    credentials: true
}));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//passportConfig();

//요청(req객체)에 passport 설정을 저장
app.use(passport.initialize());
//req.session(express-session) 객체에 passport 정보를 저장한다.
app.use(passport.session());

//테스트용
app.get('/', (req,res) => {
    console.log('연결 성공')
    res.send('Hello SENNA!!!')
})

//라우터 연결
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/search', searchRouter)
app.use('/oauth', authRouter)

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});