const http = require('http');
const fs = require('fs').promises;
const { createServer } = http;

const users = {};
createServer(async (req, res) => {
    try {
        console.log(req.method, req.url);
        if (req.method === 'GET') {
            if (req.url === '/') {
                //해당 html을 읽음.
                const data = await fs.readFile('./4-2.restFront.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/about') {
                const data = await fs.readFile('./4-2.about.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/users') {
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
            // 주소가 /도 /about도 아니면
            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch(err) {
                // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found Error 발생.
            }
        } else if (req.method === 'POST') {
            if (req.url === '/user') {
                let body = '';
                // 요청의 body를 stream 형식으로 받음
                req.on('data', (data) => {
                    body += data;
                });
                // 요청의 body를 다 받은 후 실행
                return req.on('end', () => {
                    console.log('POST 본문(Body):', body);
                    const { name } = JSON.parse(body);
                    const id = Date.now();
                    users[id] = name;
                    res.writeHead(201);
                    res.end('등록 성공');
                });
            }
        } else if (req.method === 'PUT') {
            if (req.url.startsWith('/user/')) {
                console.log("req.url: ",req.url)
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                // 요청의 body를 다 받고 실행. (end = body)
                return req.on('end', () => {
                    console.log('PUT 본문(body): ', body);
                    users[key] = JSON.parse(body).name;
                    return res.end(JSON.stringify(users));
                });
            }
        } else if (req.method === 'DELETE') {
            if (req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                delete users[key];
                return res.end(JSON.stringify(users));
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch(e) {
        console.error(e);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8'});
        res.end(e.message);
    } 
})
.listen(8082, () => {
    console.log('listening to 8082....')
})