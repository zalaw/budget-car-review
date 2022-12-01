const express = require('express')
const router = express.Router()
const httpErrors = require('http-errors')
const Car = require('../../models/Car.js')
const { getAccessToken, getUser } = require('../../helpers/utils.js')

router.get('/makes', async (req, res, next) => {
    try {
        const makes = await Car.find({}).distinct('make')
        res.send({ makes })
    } catch (err) {
        next(err)
    }
})

router.get('/cars', async (req, res, next) => {
    try {
        const limit = 6
        const page = req.query.page - 1 || 0
        const make = req.query.make || '.*'

        const totalCars = await Car.find({ make: { $regex: make } }).count()
        const lastPage = Math.ceil(totalCars / limit)

        const cars = await Car.find({ make: { $regex: make } }, {}, { skip: limit * page, limit: limit }).lean()

        cars.forEach((car) => {
            const { reviews } = car

            if (reviews.length === 0) {
                car.averageScore = 'N/A'
            } else {
                const dailyKeys = Object.keys(reviews[0].daily)
                const weekendKeys = Object.keys(reviews[0].weekend)

                let dailyScore = 0
                let weekendScore = 0

                dailyKeys.forEach((key) => {
                    const score = reviews.reduce((a, b) => {
                        return a + b.daily[key]
                    }, 0)
                    dailyScore += score
                })
                
                weekendKeys.forEach((key) => {
                    const score = reviews.reduce((a, b) => {
                        return a + b.weekend[key]
                    }, 0)
                    weekendScore += score
                })

                car.dailyAverageScore = dailyScore / reviews.length / dailyKeys.length
                car.weekendAverageScore = weekendScore / reviews.length / weekendKeys.length
                car.averageScore = ((car.dailyAverageScore + car.weekendAverageScore)/ 2).toFixed(2);
            }

            delete car.reviews
        })

        res.send({ cars, lastPage })
    } catch (err) {
        next(err)
    }
})

router.post('/cars', async (req, res, next) => {
    try {
        const accessToken = getAccessToken(req.headers.authorization)
        const user = await getUser(accessToken)

        if (!user || user.role !== 'admin') throw httpErrors.Unauthorized('Nu aveti autorizatie!')

        const doesExist = await Car.findOne({
            year: req.body.car.year,
            make: req.body.car.make,
            model: req.body.car.model
        })

        if (doesExist) throw httpErrors.Conflict(`${req.body.car.year} ${req.body.car.make} ${req.body.car.model} exista deja in baza de date!`)

        const car = new Car(req.body.car)
        await car.save()

        res.send({ message: 'Item added!' })
    } catch (err) {
        next(err)
    }
})

router.get('/cars/:id', async (req, res, next) => {
    try {
        const car = await Car.findOne({ _id: req.params.id }).lean()
        car.totalReviews = car.reviews.length

        if (!car) throw httpErrors.NotFound('Masina nu a fost gasita')

        const { reviews } = car

        if (reviews.length === 0) {
            car.dailyAverageScore = 'N/A'
            car.weekendAverageScore = 'N/A'
            car.dailyAverage = 'N/A'
            car.weekendAverage = 'N/A'
        } else {
            const dailyKeys = Object.keys(reviews[0].daily)
            const weekendKeys = Object.keys(reviews[0].weekend)
            const dailyAverage = {}
            const weekendAverage = {}

            let dailyScore = 0
            let weekendScore = 0

            dailyKeys.forEach((key) => {
                const score = reviews.reduce((a, b) => {
                    return a + b.daily[key]
                }, 0)
                dailyAverage[key] = score
                dailyScore += score
            })
            
            weekendKeys.forEach((key) => {
                const score = reviews.reduce((a, b) => {
                    return a + b.weekend[key]
                }, 0)
                weekendAverage[key] = score
                weekendScore += score
            })

            car.dailyAverageScore = (dailyScore / reviews.length / dailyKeys.length).toFixed(2)
            car.weekendAverageScore = (weekendScore / reviews.length / weekendKeys.length).toFixed(2)
            car.dailyAverage = dailyAverage
            car.weekendAverage = weekendAverage
        }

        delete car.reviews

        res.send({ car })
    } catch (err) {
        next(err)
    }
})

router.get('/cars/:id/reviews', async (req, res, next) => {
    try {
        const limit = 5
        const page = req.query.page - 1 || 0

        const accessToken = getAccessToken(req.headers.authorization)
        const user = await getUser(accessToken)

        const allReviews = await Car.findOne({ _id: req.params.id }, { reviews: 1 }).lean()
        const lastPage = Math.ceil(allReviews.reviews.length / limit)

        allReviews.reviews.sort((a, b) => b.timestamp - a.timestamp)

        let reviews = allReviews.reviews.slice(limit * page, limit * page + limit)
        
        if (!user) return res.send({ reviews, userReview: null, lastPage })

        reviews = reviews.filter((review) => review.userId != user._id.toString())

        const userReview = await Car.findOne({ _id: req.params.id, 'reviews.userId': user._id }, { 'reviews.$': 1 })

        if (page == 0 && userReview) reviews.unshift(userReview.reviews[0])

        if (!userReview) return res.send({ reviews, userReview: null, lastPage })

        res.send({ reviews, userReview: userReview.reviews, lastPage })
    } catch (err) {
        next(err)
    }
})

router.get('/reviews', async (req, res, next) => {
    try {
        const accessToken = getAccessToken(req.headers.authorization)
        const user = await getUser(accessToken)

        if (!user) throw httpErrors.Unauthorized('Utilizatorul nu a fost gasit')

        const reviewsToReturn = []
        const reviews = await Car.find({ 'reviews.userId': user._id }, { year: 1, make: 1, model: 1, 'reviews.$': 1 }).lean()

        reviews.forEach((item) => {
            const r = {
                year: item.year,
                make: item.make,
                model: item.model,
                review: item.reviews[0]
            }
            reviewsToReturn.push(r)
        })

        reviewsToReturn.sort((a, b) => b.timestamp - a.timestamp)
         
        res.send({ reviews: reviewsToReturn })
    } catch (err) {
        next(err)
    }
})

router.post('/reviews', async (req, res, next) => {
    try {
        const accessToken = getAccessToken(req.headers.authorization)
        const user = await getUser(accessToken)

        if (!user) throw httpErrors.Unauthorized('Utilizatorul nu a fost gasit!')

        const review = {
            userId: user._id,
            userEmail: user.email,
            comment: req.body.data.review.comment,
            timestamp: Date.now(),
            daily: req.body.data.review.daily,
            weekend: req.body.data.review.weekend
        }

        const isDuplicate = await Car.findOne({ _id: req.body.data.carId, 'reviews.userId': user._id })

        if (isDuplicate) throw httpErrors.Conflict('Recenzia exista deja in baza de date!')

        const car = await Car.findOne({ _id: req.body.data.carId })

        car.reviews.push(review)
        await car.save()

        res.send({ message: 'Success'})
    } catch (err) {
        next(err)
    }
})

module.exports = router