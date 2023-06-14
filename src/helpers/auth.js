const jwt = require('jsonwebtoken')
// eslint-disable-next-line no-undef
let key = process.env.JWT_KEY

const generateToken = (payload) =>{
    const verifyOpts = {
        expiresIn: '365d'
    }
    const token = jwt.sign(payload, key, verifyOpts)
    return token
}

const generateRefreshToken = (payload) =>{
    const verifyOpts = {
        expiresIn: '365d'
    }
    const token = jwt.sign(payload, key, verifyOpts)
    return token
}

module.exports = {
    generateToken,
    generateRefreshToken
}