var session = require('express-session');

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

// 세션 초기 설정
app.get('/', function(req, res){
    sess = req.session;
});

// 세션 변수 설정
app.get('/login', function(req, res){
    sess = req.session;
    sess.username = "velopert";
});

// 세션 변수 사용
app.get('/', function(req, res){
    sess = req.session;
    console.log(sess.username);
});

// 세션 제거
req.session.destroy(function(err){
    // cannot access session here
    // destroy() 메소드의 콜백함수에서는 세션에 접근 할 수 없음.
});