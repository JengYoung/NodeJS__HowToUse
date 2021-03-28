console.log('require은 밑에서도 동작합니다.');

module.exports = '저를 찾아보세요.';

require('./3.4.5.exports');

console.log("require.cache")
console.log(require.cache);
console.log("require.main === module");
console.log(require.main === module);
console.log("require.main.filename");
console.log(require.main.filename);