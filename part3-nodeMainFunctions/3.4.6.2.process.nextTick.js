

// setImmediate(() => {
//     console.log('immediate');
// });

// process.nextTick(() => {
//     console.log('nextTick')
// });

// setTimeout(() => {
//     console.log('timeout');
// }, 0)

// Promise.resolve().then(() => console.log('promise'))


setImmediate(() => console.log('this is set immediate 1'));
setImmediate(() => console.log('this is set immediate 2'));
setImmediate(() => console.log('this is set immediate 3'));

setTimeout(() => console.log('this is set timeout 1'), 0);
setTimeout(() => {
    console.log('this is set timeout 2');
    process.nextTick(() => console.log('this is process.nextTick added inside setTimeout'));
}, 0);
setTimeout(() => console.log('this is set timeout 3'), 0);
setTimeout(() => console.log('this is set timeout 4'), 0);
setTimeout(() => console.log('this is set timeout 5'), 0);

process.nextTick(() => console.log('this is process.nextTick 1'));
process.nextTick(() => {
    process.nextTick(console.log.bind(console, 'this is the inner next tick inside next tick'));
});
process.nextTick(() => console.log('this is process.nextTick 2'));
process.nextTick(() => console.log('this is process.nextTick 3'));
process.nextTick(() => console.log('this is process.nextTick 4'));


// output

// this is process.nextTick 1
// this is process.nextTick 2
// this is process.nextTick 3
// this is process.nextTick 4
// this is the inner next tick inside next tick
// this is set timeout 1
// this is set timeout 2
// this is set timeout 3
// this is set timeout 4
// this is set timeout 5
// this is process.nextTick added inside setTimeout
// this is set immediate 1
// this is set immediate 2
// this is set immediate 3