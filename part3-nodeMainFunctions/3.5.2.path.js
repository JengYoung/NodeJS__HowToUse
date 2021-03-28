const path = require('path');

const string = __filename;

console.log('path.sep', path.sep);
console.log('path.delimiter', path.delimiter);
console.log('-------------------------------------------------')
console.log('path.dirname(string)', path.dirname(string));
console.log('path.extname(string)', path.extname(string));
console.log('path.basename(string)', path.basename(string)); // 파일의 이름
console.log('path.basename - extname', path.basename(string, path.extname(string))); // 2번째 인자는 확장자를 생략하고 싶을 경우.

console.log('-------------------------------------------------')
console.log('path.parse(string)', path.parse(string)); // 파일 경로를 분리 (root, dir, base, ext, name)
console.log('path.format():' , path.format({
    dir: 'D:\\nodeJSpractice\\part3-nodeMainFunctions',
    name: 'path',
    ext: '.js',
}));
console.log('path.normalize()', path.normalize('D:\\nodeJSpractice\\\\\part3-nodeMainFunctions\\\\'));

console.log('--------------------------------------------------');
console.log('path.isAbsolute(D:\\)', path.isAbsolute('D:\\'));
console.log('path.isAbsolute(./home)', path.isAbsolute('./home'));

console.log('--------------------------------------------------');
console.log('path.relative(): ', path.relative('C:\\users\\jengyoung\\path.js', 'C:\\')); // 첫 번째 경로에서 두 번째 경로로 가는 방법
console.log('path.join(): ', path.join(__dirname, '..', '..', '/users', '.', '/jengyoung')); // 합쳐줌. ('..' : 상대경로, '.': 현재 경로)
console.log('path.resolve(): ', path.resolve(__dirname, '..', 'users', '.', '/jengyoung'));

console.log('--------------------------------------------------');