const User = require('../models/User.js')
const { decodeAccessToken } = require('./jwt_helper')

module.exports = {
    getAccessToken(authorization) {
        if (authorization === undefined) return null

        const accessToken = authorization.split(' ')[1]

        if (accessToken === 'null') return null

        return accessToken
    },
    async getUser(accessToken) {
        if (accessToken == null) return null

        const decoded = await decodeAccessToken(accessToken)
        const user = await User.findOne({ _id: decoded._id }, { password: 0 })

        if (!user) return null

        return user
    }
}

