// 단방향 암호화 알고리즘을 구현해주는 모듈.
const crypto = require('crypto');

console.log('base64: ', crypto.createHash('sha512').update('비밀번호').digest('base64'),'\n')

console.log('hex: ', crypto.createHash('sha512').update('비밀번호').digest('hex'),'\n')

console.log('base64: ', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'))


// crypto.randomBytes(만들 문자열의 길이)
// crypto.pbkdf2(비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘 인수)
console.log('\n\n')
crypto.randomBytes(64, (err, buf) => {    
    const salt = buf.toString('base64');
    console.log('salt: ', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log('password: ', key.toString('base64'));
    })
})