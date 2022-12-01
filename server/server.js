require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const httpErrors = require('http-errors')
const port = process.env.PORT || 5000

require('./helpers/init_mongodb.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

app.use(require('./routes/routes.js'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'))
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}

app.use(async (req, res, next) => {
    next(httpErrors.NotFound())
})

app.use((err, req, res, next) => {
    const error = {
        status: err.status || 500,
        message: err.message
    }

    res.status(error.status).send({ error })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
