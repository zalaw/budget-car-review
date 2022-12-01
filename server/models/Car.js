const mongoose = require('mongoose')
const { Schema } = mongoose

const ReviewSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    timestamp: {
        type: Number
    },
    daily: {
        features: {
            type: Number,
            required: true
        },
        comfort: {
            type: Number,
            required: true
        },
        quality: {
            type: Number,
            required: true
        },
        practicality: {
            type: Number,
            required: true
        }
    },
    weekend: {
        styling: {
            type: Number,
            required: true
        },
        acceleration: {
            type: Number,
            required: true
        },
        handling: {
            type: Number,
            required: true
        },
        coolFactor: {
            type: Number,
            required: true
        }
    }
})

const CarSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    reviews: [ReviewSchema]
})

const Car = mongoose.model('car', CarSchema)

module.exports = Car