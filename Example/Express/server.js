var express = require('express');
var app = express();
var router = require('./Router/main')(app); // Route Module인 main.js를 불러와서 app에 전달.

app.set('views', __dirname + '/Views'); // 서버가 읽을 수 있도록 HTML의 위치를 정의
// console.log(__dirname);

// 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// 정적파일
app.use(express.static('Public')); // Public은 폴더명

var server = app.listen(3000, function() {
    console.log("Express server has started on port 3000");
});