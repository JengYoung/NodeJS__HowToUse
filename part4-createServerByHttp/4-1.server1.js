/* http 서버가 있어야 웹 브라우저 요청 처리 가능. -> http 모듈 사용*/
const http = require('http');

const { createServer } = http;

createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1> Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(8000, () => {
        // 서버 연결
        console.log('listening to 8000...')
    })