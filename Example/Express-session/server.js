var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session'); // 모든 쿠키에 접근(cookie-parser를 사용할 필요 없음)
var fs = require('fs');

app.set('views', __dirname + '/Views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function() {
    console.log("Express server has started on port 3000");
});

app.use(express.static('Public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: '@#@$MYSIGN#@$#$', // 쿠키를 임의로 변조하는 것을 방지하기 위한 sign 값.
    resave: false, // 세션을 언제나 저장할지 (변경되지 않아도) 정하는 값.
                   // express-session documentation에서는 이 값을 false로 하는 것을 권장.
    saveUninitialized: true // uninitialized 세션이란 새로 생겼지만 변경되지 않는 세션
                            // Documentation에서 이 값을 true로 설정하는 것을 권장함.
}));


var route = require('./Router/main')(app, fs); // body Parser 설정으로 인해