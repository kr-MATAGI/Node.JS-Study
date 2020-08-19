// Node-Blocking Code
var fs = require("fs");

var filePath = "C:/Users/hoon9/Desktop/Study/Nodejs/NodejsStudy/Example/Callback function/input.txt";

// fs.readFile() -> 비동식으로 파일을 읽음
fs.readFile(filePath, function(err, data) {
    if(err) 
    {
        return console.error(err);
    }
    else
    {
        console.log(data.toString());
    }
});
// readFile() 메소드가 실행된 후 프로그램이 메소드가 끝날 때까지 대기하지 않고 곧바로 다음 명령을 진행.
// 따라서 바로 프로그램이 끝났다는 메시지를 출력 한 후, 파일의 텍스트를 출력
// 프로그램이 실질적으로 종료된 건 텍스트가 출력된 이후

console.log("Program has ended");