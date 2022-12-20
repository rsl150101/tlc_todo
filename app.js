const express = require("express");
const db = require("./models/index");

const todosRouter = require("./routes/todos.router.js");

const app = express();

app.use("/api", express.json(), todosRouter);
app.use(express.static("./assets"));

/* 쿠키 할당 방법 2가지
//* 1. res.writeHead() 로 쿠키 할당하기 
app.get("/set-cookie", (req, res) => {
  const expire = new Date();
  expire.setMinutes(expire.getMinutes() + 60); // 현재 시간의 분을 가져와 60분을 더한 값을 만료 시간으로 설정합니다. === 만료시간을 60분으로 설정

  res.writeHead(200, {
    'Set-Cookie': `name=sparta; Expires=${expire.toGMTString()}; HttpOnly; Path=/`,
  }); // 쿠키 옵션 설정
  return res.status(200).end();
});

//* 2. res.cookie() 로 쿠키 할당하기
app.get("/set-cookie", (req, res) => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 60);

  res.cookie('name', 'sparta', {
    expires: expires
  });
  return res.status(200).end();
});
*/

/* 쿠키 출력 방법 2가지
//* 일반 형태의 쿠키 출력
app.get("/get-cookie", (req, res) => {
  const cookie = req.headers.cookie;
  console.log(cookie); // name=sparta
  return res.status(200).json({ cookie });
});

//* cookie-parser middleware 를 이용해서 객체 형태로 출력
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get("/get-cookie", (req, res) => {
  const cookie = req.cookies;
  console.log(cookie); // { name: 'sparta' }
  return res.status(200).json({ cookie });
});
*/

/* 세션 설정하고 가져오기
//* cookie-parser middleware 사용
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//* set session API
let session = {}; // 세션 빈 객체 생성
app.get("/set-session", function (req, res, next) {
  const name = "sparta";
  const uniqueInt = Date.now();
  session[uniqueInt] = { name }; // 세션 키에 uniqueInt 현재 시간 할당, 값에 {name: name} 할당

  res.cookie("sessionKey", uniqueInt);  // 응답으로 cookie.sessionKey = uniqueInt 를 보냄
  return res.status(200).end();
});

//* get session API
app.get("/get-session", function (req, res, next) {
  const { sessionKey } = req.cookies; // 보내진 sessionKey 를 가져옴
  const name = session[sessionKey]; // name 에 가져온 세션의 해당 값 할당
  return res.status(200).json({ name });
});
*/

app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});
