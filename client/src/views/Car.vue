<template>
    <div class="container">
        <div v-if="Object.entries(car).length" class="main">
            <div class="jumbo">
                <div class="overlay"></div>
                <img :src="car.image" :alt="`${car.year} ${car.make} ${car.model}`">
                <div class="car-title">
                    <h1>{{ `${car.year} ${car.make} ${car.model}` }}</h1>
                    <h3>{{ `Scorul mediu Zilnic: ${car.dailyAverageScore}` }}</h3>
                    <h3>{{ `Scorul mediu Weekend: ${car.weekendAverageScore}` }}</h3>
                </div>
            </div>

            <div class="scores">
                <div class="daily">
                    <h1>Scorurile medii Zilnic</h1>
                    <div v-if="car.dailyAverage !== 'N/A'" class="score-item">
                        <div  class="score-col" v-for="(item, index) in getRatingItems.daily" :key="index">
                            <img :src="item.image" :alt="item.text">
                            <h3>{{ item.text }}: {{ (car.dailyAverage[item.field] / car.totalReviews).toFixed(2) }}</h3>
                        </div>
                    </div>
                    <div v-else>
                        <p>Nu exista recenzii</p>
                    </div>
                </div>
                <div class="weekend">
                    <h1>Scorurile medii Weekend</h1>
                    <div v-if="car.weekendAverage !== 'N/A'" class="score-item">
                        <div class="score-col" v-for="(item, index) in getRatingItems.weekend" :key="index">
                            <img :src="item.image" :alt="item.text">
                            <h3>{{ item.text }}: {{ (car.weekendAverage[item.field] / car.totalReviews).toFixed(2) }}</h3>
                        </div>
                    </div>
                    <div v-else>
                        <p>Nu exista recenzii</p>
                    </div>
                </div>
            </div>

            <div class="description">
                <p v-for="(row, index) in test" :key="index">{{ row }}</p>
            </div>

            <Reviews :carId="id" />
        </div>
        <div v-else class="not-found">
            <h1>Masina pe care o cautati nu a fost gasita...</h1>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Reviews from '../components/Reviews.vue'

export default ({
    name: 'Car',
    props: ['id'],
    components: {
        Reviews
    },
    data() {
        return {
            car: {},
        }
    },
    computed: {
        ...mapGetters(['getRatingItems']),
        test() {
            return this.car.description.split('\n')
        }
    },
    async created() {
        this.getCar()
    },
    methods: {
        async getCar() {
            try {
                const response = await axios.get(`/api/cars/${this.id}`)
                console.log(response.data)
                this.car = response.data.car
            } catch (err) {
                console.log(err.response)
            }
        }
    }
})
</script>

<style scoped>
.not-found {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-image: url('../assets/backgrounds/not-found.jpg');
    background-position: center center;
    background-size: cover; 
}
.not-found::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #0e193e;
    opacity: 0.7;
}
.not-found h1 {
    position: absolute;
    top: 50%;
    color: white;
    width: 100%;
    text-align: center;
}
.scores {
    padding: 2rem 10%;
    display: inline-block;
    position: relative;
    width: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: .8em;
}
.scores p {
    text-align: center;
}
.daily, .weekend {
    margin: 1rem 0;
}
.scores h1 {
    font-size: 1.5em;
    text-align: center;
    background-color: #1AC8DB;
    color: white;
    padding: .5rem;
    margin-bottom: 1rem;
}
.score-item {
    display: flex;
    margin-right: 1rem;
}
.score-col {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
}
.score-item img {
    width: 32px;
    margin-right: .5rem;
    display: block;
}
.score {
    font-weight: bold;
}
.email {
    font-size: 1rem;
    margin-bottom: 1rem;
}
.col-review h1 {
    font-size: 1rem;
}

.col-review span {
    font-size: 1.1em;
}

.item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: .75rem .75rem .75rem 0;
    font-size: .8rem;
}

.item img {
    width: 24px;
    margin-right: .5rem;
}

.col-review-category {
    padding-right: 1rem;
}

.col-review-comment {
    margin-top: 1rem;
    background-color: rgb(240, 240, 240);
    width: 100%;
    padding: 1rem;
    font-style: italic;
}

.review {
    padding: 1rem 2rem;
    margin: 2rem 0;
    background-color: rgb(230, 230, 230);
}

.jumbo {
    width: 100%;
    position: relative;
}

.overlay {
    position: absolute;
    background-color: #0e193e;
    opacity: 0.7;

    width: 100%;
    height: 100%;
}

.jumbo img {
    width: 100%;
    height: 800px;
    object-fit: cover;
    display: block;
}

.car-title {
    width: 100%;
    color: white;
    font-size: 3rem;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    text-align: center;
    font-size: 1.5em;
}

.car-title h3 {
    font-size: .8em;
}

.description {
    padding: 0 6rem;
}

.description p {
    margin: 2rem 0;
}

@media only screen and (max-width: 800px) {
    .scores {
        padding: 2rem 2.5%;
    }

    .score-item img {
        width: 24px;
    }

    .description {
        padding: 0 7.5%;
    }
}

@media only screen and (max-width: 640px) {
    .score-item {
        flex-wrap: wrap;
    }
    .score-col {
        width: 50%;
        margin: .25rem 0;
    }
}
</style>