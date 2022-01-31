require("dotenv").config();

const express = require("express");
/**
 * NOTE:
 *
 * morgan - 에러처리  시 얼마나 걸렸는지에 대한 요청과 정보를 담는다.
 * body-parser: 요청의 본문에 있는 데이터를 해석하여 req.body 객체로 만들어준다.
 * multer: 멀티파트 데이터를 파싱한다.
 *
 * cookie-
 */
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const path = require("path");

const app = express();

// NOTE: 포트를 설정한다. 해당 포트가 환경변수로 지정되어 있으면 지정된 포트를, 아니면 3000으로 설정한다.
app.set("port", process.env.PORT || 3000);

// NOTE: cookieParser parsed and convert cookie object -> secret sign to cookie object by preventing ananymouse hackers from manipulating Malicious cookie

/**
 * USE:
 *
 * access req.signedCookies, not cookies.
 * if you wanna remove a cookie, then you must set correct options of that (except for expires, maxAge)
 */

app
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true, // NOTE: true -> preventing anonymous user from checking cookie on client(browser)
        secure: false, // can use cookie on any environments, not https (not recommended production)
      },
    })
  )
  .use((req, res, next) => {
    console.log("Responsed");
    next();
  })
  .use(cookieParser("secretKey..."));

// multer middleware
const multer = require("multer");
const fs = require("fs");

try {
  fs.readdirSync("uploads");
} catch (e) {
  console.error("create uploads directory");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});

app.post(
  "/upload",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send("ok");
  }
);

app.get(
  "/",
  (req, res, next) => {
    res.sendFile(path.join(__dirname, "/index.html"));
    next();
  },
  (req, res) => {
    throw new Error("Error!");
  }
);

// NOTE: error processing middleware must have 4 params; err, req, res, next.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

// NOTE:  포트를 저장했던 것을 가져와서, 완료 시 다음 콘솔로그를 반환하도록 리스너를 설정한다.
app.listen(app.get("port"), () => {
  console.log(`listening to PORT ${app.get("port")}...`);
});
