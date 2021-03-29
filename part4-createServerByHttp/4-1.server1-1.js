const http = require('http');

const { createServer } = http;
const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server</p>');
});
server.listen(8080)
    .on('listening', () => console.log('listening to 8080...'))
    .on('error', (error) => console.error(error));


const server2 = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server</p>');
});
server2.listen(8082)
    .on('listening', () => console.log('listening to 8082...'))
    .on('error', (error) => console.error(error));