// const fs = require('fs');
// var http = require('http');
// // var url = require('url');

// http.createServer(function (req, res) {  
// if (req.url === "/"){
//     fs.readFile("./index.html", (err, data) =>{
//         if (err) throw err;
//         res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(data);
//             res.end();
        
//     });
// }

// if (req.url === "/about"){
//     fs.readFile("./about.html", (err, data) =>{
//         if (err) throw err;
//         res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(data);
//             res.end();
//     });
// }

// if (req.url === "/contact"){
//     fs.readFile("./contact.html", (err, data) =>{
//         if (err) throw err;
//         res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(data);
//             res.end();
//     });
// }

// if (req.url === "/home"){
//     res.writeHead(302,  {Location: "./index.html"});
//     res.end();
// }

// }).listen(3001, 'localhost');


const http = require('http');
const fs = require('fs');
const path = require('path');



const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    req.url === '/'
      ? 'index.html'
      : req.url === '/home'
      ? 'index.html'
      : req.url === '/about'
      ? 'about.html'
      : req.url === '/contact'
      ? 'contact.html'
      :req.url
  )

  const contentType = getContentType(filePath) || 'text/html'
  const emptyPagePath = path.join(__dirname, '', '404.html')
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(emptyPagePath, 'utf8', (err, data) => {
          res.writeHead(200, { 'content-Type': contentType })
          res.end(content)
        })
      } else {
        res.writeHead(500)
        res.end('A server error has occured')
      }
    }
    if (!err) {
      res.writeHead(200, { 'content-Type': contentType })
      res.end(content)
    }
  })
})

const getContentType = (filePath) => {
  let extname = path.extname(filePath)
  if (extname === '.js') {
    return 'text/javascript'
  }
  if (extname === '.css') {
    return 'text/css'
  }
  if (extname === '.jpg') {
    return 'image/jpg '
  }
  if (extname === '.png') {
    return 'image/png'
  }
}
const port = 3000

server.listen(port, () => {
  console.log(`sever is running on port ${port}`)
})
