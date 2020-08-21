// routes/index.js

const books = require("../models/books");

module.exports = function(app, bookModel)
{
    // GET all books
    app.get('/api/books', function(req, res) {
        bookModel.find(function(err, books){
            if(err)
            {
                return res.status(500).send({error : "database faul"});
            }
            else
            {
                res.json(books);
            }
        })
    }); // end Get all books

    // GET single book
    app.get('/api/books/:book_id', function(req,res){
        bookModel.findOne({_id: req.params.book_id}, function(err, book){
            if(err)
            {
                return res.status(500).json({error: err});
            }

            if(null == book)
            {
                return res.status(404).json({error: 'book not found'});
            }
            
            res.json(book);
        });
    }); // end GET single book

    // GET book by author
    app.get('/api/books/author/:author', function(req,res){
        // find() 메소드에서 첫 번째 인자에는 쿼리, 두 번째 인자에는 projection 전달.
        bookModel.find({author: req.params.author}, {_id: 1, title: 1, published_data: 1}, function(err, books){
            if(err)
            {
                return res.status(500).json({error: err});
            }

            if( 0 == books.length )
            {
                return res.stats(400).json({error: "book not found"});
            }

            res.json(books);
        });
    });

    // POST create book
    app.post('/api/books', function(req, res){
        var book = new bookModel();

        book.title = req.body.name;
        book.author = req.body.author;
        book.published_data = new Date(req.body.published_data);

        // .save : 데이터를 데이터 베이스에 저장.
        book.save(function(err){
            if(err)
            {
                console.error(err);
                res.json({result:0});
            }
            else
            {
                res.json({result:1});
            }
        });
    });

    // UPDATE the book
    app.put('/api/books/:book_id', function(req, res){
        // document 를 조회
        /*
        bookModel.findById(req.params.book_id, function(err, book){
            if(err)
            {
                return res.status(500).json({error: 'database fail'});
            }

            if( null == book )
            {
                return res.status(404).json({error: 'book not found'});
            }

            if( null != req.body.title )
            {
                book.title = req.body.title;
            }

            if( null != req.body.author )
            {
                book.author = req.body.author;
            }

            if( null != req.body.published_data )
            {
                book.published_data = req.body.published_data;
            }

            book.save(function(err) {
                if(err)
                {
                    res.stats(500).json({error: "Fail to Update"});
                }
                else
                {
                    res.json({message: "book updated"});
                }
            });
        }); 
        */
       
        // document 조회 X
        bookModel.update({ _id: req.params.book_id}, { $set: req.body }, function(err, output){
            if(err)
            {
                res.status(500).json({error : "database fail"});
            }
            else
            {
                console.log(output);
            }
            
            if( 0 == output.n)
            {
                return res.status(400).json({error : "book not found"});
            }

            res.json({message : "book updated"});
        });
    }); // end UPDATE the book

    // DELETE book
    app.delete('/api/books/:book_id', function(req, res){
        bookModel.remove({_id: req.params.book_id}, function(err, output){
            if(err)
            {
                return res.status(500).json({error : 'db fail'});
            }
            
            /* 실제로 존재하는 데이터를 삭제하였는지 확인해주는 코드
            ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            */
            
            // HTTP 204 : No Content, 요청한 작업을 수행하였고 데이터를 반환할 필요가 없다.
            res.status(204).end();
        });
    }); // end DELETE book
}