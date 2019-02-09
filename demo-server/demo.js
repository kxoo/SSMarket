let user = require('./User');

let  http = require('http')
let server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('hello world.js')
})

server.listen(3000, '127.0.0.1', ()=> {
  console.log('server')
})
