// 회원 정보
const users = [
  {
    id: 1,
    name: "userID_1",
    email: "userID_1@gmail.com",
    password: "1234",
  },
  {
    id: 2,
    name: "userID_2",
    email: "userID_2@gmail.com",
    password: "5678",
  },
];

// 회원가입 엔드포인트
const createUser = (req, res) => {
  try {
    const userCount = users.length;
    // 클라이언트가 준 정보
    const userInfo = req.body.data;
    // 회원 정보 배열에 클라이언트가 준 정보 추가
    users.push({
      id: userCount + 1,
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
    });

    // 이미 가입된 email 인지 여부 함수
    const isExistEmail = () => {
      for (let i = 0; i < users.length; i++) {
        if (userInfo.email === users[i].email) {
          return true;
        } else {
          return false;
        }
      }
    };

    // 비밀번호 길이가 5 미만일 때 >> 400
    if (userInfo.password.length < 5) {
      res.status(400).json({ message: "PASSWORD_DATA_TOO_SHORT" });
      // email 주소 오류 >> 400
    } else if (!userInfo.email.includes("@")) {
      res.status(400).json({ message: "INVALID_EMAIL" });
      // 이미 가입된 email >> 409
    } else if (isExistEmail) {
      res.status(409).json({ message: "EMAIL_ALREADY_EXIST" });
      // 요청시 body에 아무것도 없을 때
    } else {
      // 정상적인 요청을 보냈을 때
      res.status(200).json({ message: "userCreated" });
    }
  } catch (error) {
    // body에 아무것도 없을 때
    res.status(400).json({ message: "REQUEST_WITHOUT_DATA" });
  }
};

//res.status(400).json({ message: "INVALID_EMAIL" });

// body에 아무것도 없을 때
// res.status(400).json({ message: "REQUEST_WITHOUT_DATA" });

// 회원 게시물 정보
const posts = [
  {
    id: 1,
    title: "userID_1 이 작성한 게시물1 의 제목",
    content: "userID_1 이 작성한 게시물1 의 본문",
    userID: 1,
  },
  {
    id: 2,
    title: "userID_1 이 작성한 게시물2 의 제목",
    content: "userID_1 이 작성한 게시물2 의 본문",
    userID: 1,
  },
];

// 게시글 생성 엔드포인트
const createPost = (req, res) => {
  const post = req.body.data;

  posts.push({
    id: post.id,
    title: post.title,
    content: post.content,
    userID: post.userID,
  });

  res.json({ message: "postCreated" });
};

// 전체 게시글 목록
const postlist = [
  {
    userID: 1,
    userName: "userID_1",
    postingId: 1,
    postingTitle: "userID_1 이 작성한 게시물1 의 제목",
    postingContent: "userID_1 이 작성한 게시물1 의 본문",
  },
  {
    userID: 2,
    userName: "userID_2",
    postingId: 2,
    postingTitle: "userID_2 이 작성한 게시물1 의 제목",
    postingContent: "userID_2 이 작성한 게시물1 의 본문",
  },
  {
    userID: 3,
    userName: "userID_3",
    postingId: 3,
    postingTitle: "userID_3 이 작성한 게시물1 의 제목",
    postingContent: "userID_3 이 작성한 게시물1 의 본문",
  },
  {
    userID: 4,
    userName: "userID_4",
    postingId: 4,
    postingTitle: "userID_4 이 작성한 게시물1 의 제목",
    postingContent: "userID_4 이 작성한 게시물1 의 본문",
  },
];

// 전체 게시글 목록 조회 엔드포인트
const lookupPost = (req, res) => {
  res.json({ data: postlist });
};

// 회원 게시글 정보 수정 엔드포인트
const editPost = (req, res) => {
  const editedPost = req.body;

  // 특정 userID가 작성했던 게시물 수정
  for (let i = 0; i < postlist.length; i++) {
    if (editedPost.data.userID === i + 1) {
      postlist[i] = editedPost.data;
    }
  }
  res.json(editedPost);
};

// 회원 게시글 삭제 수정 엔드포인트
const deletePost = (req, res) => {
  // const { id } = req.query;  << 쿼리로 받아오는 방법 (구조 분해 할당)

  // 전부 삭제
  posts.splice(0, postlist.length);
  res.json({ message: "postingDeleted" });
};

// 사용자와 사용자가 등록한 게시글 목록 조회 엔드포인트
const lookupUserPost = (req, res) => {
  const userPost = require("./userPosts.json");
  const userID = req.body.data.userID;

  // 특정 userID가 작성했던 게시물 추출
  for (let i = 0; i < userPost.data.length; i++) {
    if (userID === i + 1) {
      res.json({ data: userPost.data[i] });
    }
  }
};

// server.js 에서 사용하기 위해 export 해줌
module.exports = {
  createUser,
  createPost,
  lookupPost,
  editPost,
  deletePost,
  lookupUserPost,
};
