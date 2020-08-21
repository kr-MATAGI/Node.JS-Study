module.exports = function(app, fs)
{
    app.get('/', function(req, res) {
        res.render('index', {
            title: "my homepage",
            length: 5            
        })
    });

    app.get("/list", function(req,res) {
        // __dirname : 현재 모듈의 위치
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', function(err, data){
            console.log(__dirname);
            console.log(data);
            res.end( data );
        });
    })
}