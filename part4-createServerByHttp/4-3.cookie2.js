const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => {
    console.log(`cookie: ${cookie}`)
    // 쉽게 표현을 하자면, 맨 처음에 cookie가 
    return cookie 
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {})
}

const { createServer } = http;
createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    console.log(cookies);

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        console.log('hi')
        const { query } = url.parse(req.url);
        console.log(`query: ${query}`);
        const { name } = qs.parse(query);
        console.log(`name: ${name}`);
        const expires = new Date();
        // 쿠키 유효 시간 => 현재 시간 + 1분으로 설정. 이후에는 쿠키 제거.
        expires.setMinutes(expires.getMinutes() + 1)
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        }); // Set-Cookie는 한글, 줄바꿈 불가함.
        res.end();

        // name이라는 쿠키가 있는 경우
    } else if (cookies.name) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        try {
            const data = await fs.readFile('./4-3.cookie2.html');
            console.log('hi')
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        } catch(e) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8'});
            res.end(e.message);
        }
    }
})
    .listen(8084, () => {
        console.log('Listening to 8084...')
    })