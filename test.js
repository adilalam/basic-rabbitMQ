// setTimeout(() => {
//     console.log('setTimeOut 1');
// }, 1000)

// console.log('1');
// setTimeout(() => {
//     console.log('setTimeOut 2');
// }, 2000)

// console.log('2');

// setTimeout(() => {
//     console.log('setTimeOut 3');
// }, 3000)


// async function print() {

// }

// print()

const http = require('http')
const cluster = require('cluster')
const { cpus } = require('os');

let num = cpus().length;

if (cluster.isMaster) {
    console.log('master ', process.pid);
    for (let i = 0; i < num; i++) {
        cluster.fork()
    }
} else {
    http.createServer((req, res) => {
        const message = 'worker ' + process.pid;
        console.log(message);
        res.end(message)
    }).listen(3000);
}

