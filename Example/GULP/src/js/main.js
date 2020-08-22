// Router 코드를 따로 작성했기에, server.js에서 모듈로서 불러올 수 있도록 사용.
module.exports = function(app, fs)
{
    // GET
    // JSON 데이터를 render 메소드의 두 번째 인자로 전달함으로서 페이지에서 데이터를 사용가능하게 됩니다.
    app.get('/', function(req, res) {
        var sess = req.session;

        res.render('index', {
            title: "MY HOMEPAGE",
            length: 5,
            name: sess.name,
            username: sess.username
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

    app.get('/getUser/:username', function(req, res){
        fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err,data){
            var users = JSON.parse(data);
            res.json(users[req.params.username]);
        });
    });

    // POST
    app.post('/addUser/:username', function(req, res){
        var result = { };
        var username = req.params.username;
        console.log("userName -->" + username);

        // CHECK REQ VALIDTY
        if( (null == req.body["password"]) || (null == req.body["name"]))
        {
            console.log( "check req validty !");
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err, data){
            var users = JSON.parse(data);
            console.log("users[username] : " + users[username]);
            if(null != users[username])
            {
                // DUPLICATION FOUND
                console.log( "load data & check duplication");
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }

            // ADD TO DATA
            users[username] = req.body;
            console.log(req.body);

            // SAVE DATA
            fs.writeFile(__dirname + "/../data/user.json", 
                JSON.stringify(users, null, '\t'), 'utf8', function(err, data){
                    console.log("Save Data");
                    result = {"success" : 1};
                    res.json(result);
                    //JSON.stringify 는 pretty-print를 위함                
            });
        });
    }); // end POST

    // DELETE
    app.delete('/delete/:username', function(req, res) {
        var result = {};
        
        // LOAD Data
        fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err, data){
            var users = JSON.parse(data);

            // If Not Found
            if( null == users[req.params.username])
            {
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            delete users[req.params.username];
            fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'),
                'utf8', function(err, data){
                    result["success"] = 1;
                    res.json(result);
                    return;
                });
        }); // end Load data
    }); // end DELETE

    // Login
    app.get('/login/:username/:password', function(req, res){
        console.log("Logtin process START !");
        var sess;
        sess = req.session;

        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data){
            var users = JSON.parse(data);
            var userName = req.params.username;
            var password = req.params.password;
            var result = {};
            if( null == users[userName] )
            {
                // userName not found
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            if(password == users[userName]["password"])
            {
                result["success"] = 1;
                sess.username = userName;
                sess.name = users[userName]["name"];
                res.json(result);
            }
            else
            {
                result["sucess"] = 0;
                result["error"] = "incorrect";
                res.json(result);
            }
        });
    }); // end Login

    // Logout
    app.get("/logout", function(req, res){
        console.log("logout START!");
        
        sess = req.session;
        console.log(sess.username);
        if( null != sess.username )
        {
            sess.destroy(function(err){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.redirect('/');
                }
            });
        }
        else
        {
            res.redirect('/');
        }
    }); // end Logout
}