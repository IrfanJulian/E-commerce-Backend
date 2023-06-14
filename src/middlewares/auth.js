const { response } = require('../helpers/common');
const jwt = require('jsonwebtoken');

let key = process.env.JWT_KEY

const protect = (req, res, next) => {
    try {
        let token
        if(req.headers.authorization){
            let auth = req.headers.authorization
            token = auth.split(" ")[1]
            let decode = jwt.verify(token,key)
            req.payload = decode
            next()
        } else {
            return response(res, null, 'failed', 404, 'Server Need Token')
        }
    } catch (error) {
        if(err && err.name == 'JsonWebTokenError'){
            return response(res, null, 'failed', 404, 'Invalid Token')
        } else if (err && err.name == 'TokenExpriredError'){
            return response(res, null, 'failed', 404, 'Invalid Token')
        } else {
            return response(res, null, 'failed', 404, 'Invalid Token')
        }
    }
}

module.exports = {
    protect
}