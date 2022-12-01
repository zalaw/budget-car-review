const jwt = require('jsonwebtoken')
const httpErrors = require('http-errors')

module.exports = {
    signAccessToken: (id) => {
        return new Promise((resolve, reject) => {
            const payload = { _id: id }
            const secret = process.env.ACCESS_TOKEN_SECRET
            
            jwt.sign(payload, secret, (err, token) => {
                if (err) {
                    console.log(err.message)
                    return reject(httpErrors.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    decodeAccessToken: (accessToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject(httpErrors.Unauthorized(message))
                }
                resolve(decoded)
            })
        })
    }
}