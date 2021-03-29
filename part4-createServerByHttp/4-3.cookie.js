const http = require('http');
// const { createServer } = http;

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { 'Set-Cookie': 'mycookie=test'});
    res.end('Hello Cookie');
})
    .listen(8083, () => {
        console.log('Listening to 8083...');
    });