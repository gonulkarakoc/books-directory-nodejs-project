const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token;
    if(token){
        jwt.verify(token, req.app.get('api_secret_key'),(error, data) =>{
            if(error){
                res.json({
                    status: false,
                    message: 'Failed to authenticate token'
                });
            } else {
                req.decode = data;
                next();
            }
        });
    } else {
        res.json({
            status: false,
            message: 'No token provided'
        });
    };
}