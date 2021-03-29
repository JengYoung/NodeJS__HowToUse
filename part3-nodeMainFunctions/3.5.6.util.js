// util.deprecate(함수, 함수를 작동시킨 후 나올 경고 메시지)
const util = require('util');
const crypto = require('crypto');
const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
    .then((buf) => {
        console.log(buf.toString('base64'));
    })
    .catch((error) => {
        console.error(error);
    });

