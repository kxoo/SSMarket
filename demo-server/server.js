const http = require('http');
const url = require('url');
const util = require('util');
const fs = require('fs');

let server = http.createServer((req, res) => {
  // res.status = 200;

  // res.setHeader("Content-Type", "text/plain: charset=utf-8");
  let pathname = url.parse(req.url).pathname;

  fs.readFile(pathname.substring(1), (err, data) => {
    if(err) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
        })
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html'
      })

      res.write(data.toString())
    }
    res.end()
  })
  // res.end(util.inspect(url.parse(req.url)));
})

server.listen(4000, '127.0.0.1')
