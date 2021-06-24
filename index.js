const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const mongoose = require('mongoose');
const { User } = require('./models/User');


const uri = "mongodb+srv://zdtfcx:songyuijo28@senna.2vyi8.mongodb.net/Senna?retryWrites=true&w=majority";
// db connect
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`mongoDB connected`))
  .catch((err) => console.error(err));

const app = express();
const port = 80;

app.use(cors({
    origin: true,
    methods: 'GET, POST, OPTIONS',
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


app.post("/register", (req, res) => {
    // User 데이터 모델과 연결된 객체 생성 후 req.body 삽입
    const user = new User(req.body);
  
    // save 메서드를 통해 원격 저장소에 데이터 저장.
    user.save((err, userInfo) => {
      // 에러면 false 반환
      if (err) return res.json({ suceess: false, err });
      // 성공적이면 200 상태 코드 날리고 true 값 돌려주기
      return res.status(200).json({ suceess: true });
    });
});

//라우터 연결
app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});