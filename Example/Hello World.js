// 어플리케이션에 필요한 모듈을 불러올땐 require 명령을 사용
var http = require("http");

http.createServer(function(request, response) {
    /**
     * HTTP 헤더 전송
     * HTTP Status : 200 (OK)
     * Content Type : text/plain
     */
    response.writeHead(200, { 'Content-Type': 'text/plain'});

    /**
     * Response Body를 "Hello World" 로 설정
     */
    response.end("Hello World\n");
}).listen(8081);

// 127.0.0.1 == localhost
console.log("Server running at http://192.168.0.3:8081");