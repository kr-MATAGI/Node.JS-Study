const jwt = require('jsonwebtoken')

const authMiddleware = function(req, res, next) {
    // read thre token from header or url
    const token = req.headers['x-access-token'] || req.query.token;

    // token does not exist
    if( null == token )
    {
        return res.status(403).json({
            success: false,
            message: 'login fail'
        })
    }

    // create a promise that decodes the token
    const promise = new Promise(function(resolve, reject){
        jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded) {
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

    // if it has failed to verify, it will return an error message
    const onError = function(error) {
        res.status(403).json({
            success: false,
            message: error.message
        });
    }

    // proccess the promise
    promise.then(function(decoded){
        req.decoded = decoded;
        next();
    }).catch(onError);
}

module.exports = authMiddleware;