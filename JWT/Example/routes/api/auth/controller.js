const User = require("../../../models/user");
const jwt = require('jsonwebtoken');

/*
    POST /api/auth/register
    {
        username,
        password
    }
*/
exports.register = (req, res) => {
    const { username, password } = req.body;
    console.log("POST Data : ", username, " : ", password);

    let user = null;

    // create a new user if does not exist
    const create = function(user) {
        console.log("CREATE method");
        if(user)
        {
            throw new Error('username is exists');
        }
        else
        {
            return User.create(username, password);
        }
    }

    // count the number of the user
    const count = function(user) {
        newUser = user;
        // count()는 mongoose의 method 중 하나라고 추정.
        return User.count({}).exec();
    }

    // assign admin if count is 1
    const assign = function(count) {
        if( 1 == count )
        {
            return newUser.assignAdmin();
        }
        else
        {
            /**
             * Promise()는 자바스크립트 비동기 처리에 사용되는 객체
             * 비동기 처리란 특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성 
             * 
             * Promise()의 3가지 상태 - new Promise()를 생성하고 종료될 때까지 3가지의 상태를 갖는다.
             * Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
             * Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태 - resolve()를 실행했을 때
             * Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태
             */ 
            
            return Promise.resolve(false);
        }
    }

    // respond to the client
    const respond = function(bIsAdmin) {
        res.json({
            message: 'registered successfully',
            admind: bIsAdmin ? true : false
        });
    }

    // run when there is an error (username exists)
    const onError = function(error) {
        res.status(409).json({
            message: error.message
        });
    };

    // check userName duplication
    User.findOneByUsername(username)
        .then(create)
        .then(count)
        .then(assign)
        .then(respond)
        .catch(onError)
}

exports.login = (req, res) => {
    const { username, password } = req.body;

    const secret = req.app.get('jwt-secret');
    
    /**
     * check the user info & generate the jwt
     */
    const check = function(user) {
        if(!user)
        {
            throw new Error('login failed');
        }
        else
        {
            if(user.verify(password))
            {
                // create a promise that generates jwt asynchronously
                const p = new Promise(function(resolve, reject) {
                    jwt.sign(
                        {
                            _id: user._id,
                            username: user.username,
                            admin: user.admin
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'velopert.com',
                            subject: 'userInfo'
                        }, function(err, token) {
                            if (err) 
                            {
                                reject(err)
                            }
                            else
                            {
                                resolve(token)
                            }
                        }
                    )
                });
                return p;
            }
            else
            {
                throw new Error('login Failed');
            }
        }
    }

    // respond the token
    const responed = function(token) {
        res.json({
            message: 'login is successfully',
            token
        });
    }

    // error occurred
    const onError = function(error) {
        res.status(403).json({
            message: error.message
        })
    }

    User.findOneByUsername(username)
        .then(check)
        .then(responed)
        .catch(onError)
}

exports.check = function(req, res) {
    res.json({
        success: true,
        info: req.decoded
    });

    // read the token from headr or url
    /*
    const token = req.headers['x-access-token'] || req.query.token;

    // toekn does not exist
    if(null == token)
    {
        return res.status(403).json({
            success: false,
            messgae: 'fail login'
        });
    }

    // create a promise that decodes the token
    const promise = new Promise(function(resolve, reject)
    {
        jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded){
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(decoded);
            }
        });
    });

    // if token is valid, it will respond with its info
    const respond = function(token) {
        res.json({
            success: true,
            info: token
        })
    }

    // if it has failed to verity, it will return an error mssage
    const onError = function(error) {
        res.status(403).json({
            success: false,
            message: error.message
        });
    }

    // process the promise
    promise.then(respond).catch(onError);\
    */
}