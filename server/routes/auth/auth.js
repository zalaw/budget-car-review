const express = require('express')
const router = express.Router()
const httpErrors = require('http-errors')
const User = require('../../models/User.js')
const { getAccessToken, getUser } = require('../../helpers/utils.js')
const { signAccessToken } = require('../../helpers/jwt_helper.js')

router.get('/user', async (req, res, next) => {
    try {
        const accessToken = getAccessToken(req.headers.authorization)
        const user = await getUser(accessToken)

        res.send({ user })
    } catch(err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) throw httpErrors.NotFound('Utilizator neinregistrat')
        if (!await user.isPasswordValid(req.body.password)) throw httpErrors.Unauthorized('Credentiale invalide')

        const accessToken = await signAccessToken(user._id)
        const userToReturn = await User.findOne({ _id: user._id }, { password: 0 })
        
        res.send({ accessToken, user: userToReturn })
    } catch (err) {
        next(err)
    }
})

router.post('/signup', async (req, res, next) => {
    try {
        const doesExist = await User.findOne({ email: req.body.email })

        if (doesExist) throw httpErrors.Conflict(`${req.body.email} exista deja!`)

        const user = new User(req.body)
        await user.save()
        
        res.send({ message: 'Cont creat!' })
    } catch (err) {
        next(err)
    }
})



module.exports = router