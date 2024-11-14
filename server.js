// server.js

const http = require('http');
const express = require('express');
const cors = require('cors')

const app = express(); // express 실행

app.use(cors({
  // cors 설정
  origin: "http://127.0.0.1:5500",
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
}))

app.use(express.json()) // json 처리 안해줘도 됨
app.use(express.text()) // json 처리 안해줘도 됨

let data = { message: '여러분 화이팅!' };

app.options('/', (req, res) => {
  res.sendStatus(204); // CORS preflight 요청에 대한 응답
  return;
})

app.get('/', (req, res) => {
  res.status(200).json(data); // JSON 응답
})

app.post('/', (req, res) => {
  data.message = req.body; // 데이터 업데이트
  res.status(200).send(`받은 POST 데이터: ${req.body}`);
})

app.put('/', (req, res) => {
  data.message = req.body;
  res.status(200).send(`업데이트된 데이터: ${req.body}`);
})

app.delete('/', (req, res) => {
  data = {};
  res.status(200).send('데이터가 삭제되었습니다.');
})

// // CORS 설정을 위한 헤더
// const headers = {
//   'Access-Control-Allow-Origin': "http://127.0.0.1:5500",
//   'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
//   'Access-Control-Allow-Headers': 'Content-Type',
// };

// let data = { message: '여러분 화이팅!' };

// const server = http.createServer((req, res) => {
//   if (req.method === 'OPTIONS') {
//     res.writeHead(204, headers);
//     res.end();
//     return;
//   }

//   if (req.method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'application/json', ...headers });
//     res.end(JSON.stringify(data));
//   }

//   if (req.method === 'POST') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       data.message = body;
//       res.writeHead(200, headers);
//       res.end(`받은 POST 데이터: ${body}`);
//     });
//   }

//   if (req.method === 'PUT') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       data.message = body;
//       res.writeHead(200, headers);
//       res.end(`업데이트된 데이터: ${body}`);
//     });
//   }

//   if (req.method === 'DELETE') {
//     data = {};
//     res.writeHead(200, headers);
//     res.end('데이터가 삭제되었습니다.');
//   }
// });

app.listen(3000, () => {
  console.log('서버가 http://localhost:3000/ 에서 실행 중입니다.');
});
