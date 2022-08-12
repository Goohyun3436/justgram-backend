// Node.js 내장 모듈 'http'
const http = require("http");
// express, cors(cross-origin HTTP 요청 가능) 모듈 가져오기
const express = require("express");
const cors = require("cors");

// user.js의 함수 가져오기
const {
  createUser,
  createPost,
  lookupPost,
  editPost,
  deletePost,
  lookupUserPost,
} = require("./app");
// json 파일 가져오기
const feeds = require("./feeds.json");

const app = express();
// 모든 결과를 json 형태로 반환하겠다. 라는 의미
app.use(express.json());
// cross-origin HTTP 요청 가능
app.use(cors());

// app.method(endpoing url, handler function)
app.get("/ping", (req, res) => res.json({ message: "pong" }));
app.post("/signup", createUser); // 회원가입 엔드포인트
app.post("/posts", createPost); // 게시글 생성 엔드포인트
app.get("/postlist", lookupPost); // 게시글 목록 조회 엔드포인트
app.patch("/editpost", editPost); // 게시글 정보 수정 엔드포인트
// 피드 목록 조회 엔드포인트
app.get("/feeds", (req, res) => {
  res.json(feeds);
});
// 게시글 삭제 수정 엔드포인트
app.delete("/delete", deletePost);
// 사용자와 사용자가 등록한 게시글 목록 조회 엔드포인트
app.get("/userpost", lookupUserPost);

// http.createServer(function)
const server = http.createServer(app);

// listen(port number, callback)
server.listen(8000, () => {
  console.log("server is listening on PORT 8000");
});
