const url = require('url');

const { URL } = url;
const myURL = new URL('https://www.npmjs.com/package/qs');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('---------------------------------------------------');
const parseUrl = url.parse('https://www.npmjs.com/package/qs');
console.log('url.parse(): ', parseUrl);
console.log('url.format(): ', url.format(parseUrl));


