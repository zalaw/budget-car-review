const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB connected')
}).catch((err) => {
    console.log(err.message)
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('Shutting down MongoDB')
    process.exit(0)
})