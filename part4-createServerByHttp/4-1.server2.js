const http = require('http');
const fs = require('fs').promises;

const { createServer } = http;

createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./4-1.server2.html')
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data); 
    } catch(err) {
        console.error(err);
        res.writeHead(700, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
})
.listen(8081, () => {
    console.log('listening to 8081....')
})