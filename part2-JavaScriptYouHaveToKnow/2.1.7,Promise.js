const flag = true; // true -> resolve, false -> reject

const promise = new Promise((resolve, reject) => {
    if (flag) resolve('성공');
    else reject('실패');
});

promise
    .then(msg => console.log(msg))
    .catch(err => console.log(err))
    .finally(() => console.log('End'))

promise
    .then((msg) => {
        return new Promise((resolve, reject) => {
            resolve(msg)
            console.log('1 passed')
        })
    })
    .then((msg2) => {
        return new Promise((resolve, reject) => {
            resolve(msg2)
            console.log('2 passed')
        })
    })
    .then((msg3) => {
        console.log(msg3);
    })
    .catch((err) => {
        console.error(err)
    });
