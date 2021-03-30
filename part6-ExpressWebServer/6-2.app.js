require('dotenv').config()
const express = require('express');

const app = express();
/* app.set(key, value)

    key에 value를 담아두어, 나중에 해당 data를 app.get(key)로 가져올 수 있다.

*/
app.set('port', process.env.PORT || 4000);

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
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