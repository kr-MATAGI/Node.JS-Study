// Router 코드를 따로 작성했기에, server.js에서 모듈로서 불러올 수 있도록 사용.
module.exports = function(app, fs)
{
    // JSON 데이터를 render 메소드의 두 번째 인자로 전달함으로서 페이지에서 데이터를 사용가능하게 됩니다.
    app.get('/', function(req, res) {
        res.render('index', {
            title: "MY HOMEPAGE",
            length: 5
        })
    });
}