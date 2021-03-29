const {
    Worker, isMainThread, parentPort,
} = require('worker_threads');

// 부모일 때
if(isMainThread) {
    const worker = new Worker(__filename);
    // on은 event listener. 
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => console.log('worker exit'));
    // MainThread에서 worker에게 message를 보내서, event를 일으킴.
    worker.postMessage('ping');
} else {
    //이벤트를 받으면
    parentPort.on('message', (value) => {
        console.log('from parent', value);
        // 부모포트에게도 메시지를 보냄.
        parentPort.postMessage('pong');
        parentPort.close();
    })
}