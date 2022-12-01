<template>
    <div class="review-container">
        <h1>Recenziile dumneavoastra</h1>
        <div class="review" v-for="(review, index) in reviews" :key="index">
            <div class="user-email">
                <h1>{{`${review.year} ${review.make} ${review.model}` }} @ {{ getDate(review.review.timestamp) }}</h1>
            </div>
            <div class="row">
                <div class="col-review">
                    <h1>Zilnic</h1>
                    <div class="daily-container">
                        <div class="row">
                            <div v-for="(item, index) in getRatingItems.daily" :key="index" class="item">
                                <img :src="item.image" :alt="item.text">
                                <span>{{ item.text }}: <span class="score">{{ review.review.daily[item.field] }}</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-review">
                    <h1>Weekend</h1>
                    <div class="weekend-container">
                        <div class="row">
                            <div v-for="(item, index) in getRatingItems.weekend" :key="index" class="item">
                                <img :src="item.image" :alt="item.text">
                                <span>{{ item.text }}: <span class="score">{{ review.review.weekend[item.field] }}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-review-comment">
                    {{ review.review.comment }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default ({
    name: 'MyReviews',
    data() {
        return {
            reviews: []      
        }
    },
    computed: {
        ...mapGetters(['getRatingItems'])
    },
    async created() {
        try {
            const response = await axios.get('/api/reviews', { headers: { 'authorization': `Bearer ${localStorage.getItem('accessToken')}` } })
            this.reviews = response.data.reviews
        } catch (err) {
            console.log(err.response)
        }
    },
    methods: {
        getDate(timestamp) {
            const date = new Date(timestamp)
            const year = date.getFullYear()
            const month = ('0' + (date.getMonth() + 1)).slice(-2)
            const day = ('0' + (date.getDate() + 1)).slice(-2)
            const hours = ('0' + (date.getHours() + 1)).slice(-2)
            const minutes = ('0' + (date.getMinutes() + 1)).slice(-2)
            const seconds = ('0' + (date.getSeconds() + 1)).slice(-2)

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        }
    }
})
</script>

<style scoped>
.review-container {
    padding: 6rem 5%;
}

.review {
    margin: 1rem 0;
    padding: 1rem;
    background-color: rgb(230, 230, 230)
}
.user-email {
    font-size: .5em;
    margin-bottom: 1rem;
}
.col-review h1 {
    font-size: 1em;
}
.item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: .5rem;
}
.item img {
    width: 24px;
    margin-right: .25rem;
}
.score {
    font-weight: bold;
}
.col-review-comment {
    background-color: rgb(250, 250, 250);
    width: 100%;
    margin-top: 1rem;
    padding: .5rem;
}
@media only screen and (max-width: 800px) {
    .review-container {
        padding: 6rem 7.5%;
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