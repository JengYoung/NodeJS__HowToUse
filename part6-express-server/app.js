require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

// NOTE: 포트를 설정한다. 해당 포트가 환경변수로 지정되어 있으면 지정된 포트를, 아니면 3000으로 설정한다.
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// NOTE:  포트를 저장했던 것을 가져와서, 완료 시 다음 콘솔로그를 반환하도록 리스너를 설정한다.
app.listen(app.get("port"), () => {
  console.log(`listening to PORT ${app.get("port")}...`);
});
