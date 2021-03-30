const multer = require('multer');
const fs = require('fs');

try {
    fs.readdirSync('uploads');
} catch(e) {
    console.error('uploads folder X -> create uploads folder');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload',
    upload.fields([{ name: 'image1'}, { name: 'image2' }]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    },
);

app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
});