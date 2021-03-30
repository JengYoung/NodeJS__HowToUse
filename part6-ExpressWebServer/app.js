require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');


const app = express();
const { PORT, COOKIE_SECRET } = process.env
app.set('port', PORT || 4000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json()); // body-parser. 요청의 본문 데이터를 해석, req.body 객체로 만들어줌.
app.use(express.urlencoded({ extended: false })); // 단 이미지, 파일, 동영상은 처리 못함. multer모듈 사용해야.
app.use(cookieParser(COOKIE_SECRET)); // 요청에 동봉된 쿠키를 해석, req.cookies 객체로 만듦. 예) name=jengyoung -> {name: 'jengyoung'}
app.use(session({ // 세션 관리용 미들웨어. 세션 구현 및 특정 사용자를 위한 임시 데이터 저장할 때 유용.
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.')
    next();
});



// 미들웨어는 같은 라우터에 여러 개 장착할 수 있음. (현재: 2개)
app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

const port = app.get('port')
app.listen(port, () => {
    console.log(`Listening to ${port}...`)
})