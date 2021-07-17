import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import DBconnect from './config/connect.js'
import userRouter from './routers/user.js';
import postRouter from'./routers/post.js';
import searchRouter from './routers/search.js';
import authRouter from './routers/auth.js';

const app = express();
const port = 80;

DBconnect();

app.use(cors({
  origin: true,
  credentials: true,
  methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());


//* 라우터 연결 *
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/search', searchRouter)
app.use('/oauth', authRouter)

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});