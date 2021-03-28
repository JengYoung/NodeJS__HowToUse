const os = require('os');

console.log('운영체제 정보--------------------------------');
console.log('os.arch(): ', os.arch()); // process.arch와 동일.
console.log('os.platform(): ', os.platform()); // process.platform과 동일.
console.log('os.type(): ', os.type()); // 운영체제 종류
console.log('os.uptime(): ', os.uptime()); // 부팅 이후 흐른 시간
console.log('os.hostname(): ', os.hostname()); // 컴퓨터 이름
console.log('os.release(): ', os.release()); // 운영체제 버전

console.log('경로--------------------------------');
console.log('os.homedir(): ', os.homedir()); // 홈 디렉터리 경로
console.log('os.tmpdir(): ', os.tmpdir()); // 임시 파일 저장 경로

console.log('cpu 정보--------------------------------');
console.log('os.cpus(): ', os.cpus()); // 컴퓨터 코어 정보
console.log('os.cpus().length: ', os.cpus().length); // 코어 개수, cpus() 메서드를 위해 코어 개수에 맞춰 프로세스 늘릴 수 있음.

console.log('cpu 정보--------------------------------');
console.log('os.freemem(): ', os.freemem()); // 사용 가능한 메모리(RAM)
console.log('os.totalmem(): ', os.totalmem()); // 전체 메모리 용량
