<template>
    <div class="reviews">
        <h1>Recenzii</h1>

        <div v-if="!user">
            <h1>Trebuie sa fiti autentificat pentru a lasa o recenzie</h1>
        </div>
        <div v-else-if="!userReview">
            <AddReview :carId="carId"/>
        </div>
        
        <div class="review" v-for="(review, index) in reviews" :key="index">
            <div class="user-email">
                <h1>Recenzia utilizatorului {{ review.userEmail }} | {{ getDate(review.timestamp) }}</h1>
            </div>
            <div class="row">
                <div class="col-review">
                    <h1>Zilnic</h1>
                    <div class="daily-container">
                        <div class="row">
                            <div v-for="(item, index) in getRatingItems.daily" :key="index" class="item">
                                <img :src="item.image" :alt="item.text">
                                <span>{{ item.text }}: <span class="score">{{ review.daily[item.field] }}</span></span>
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
                                <span>{{ item.text }}: <span class="score">{{ review.weekend[item.field] }}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-review-comment">
                    {{ review.comment }}
                </div>
            </div>
        </div>

        <div class="t" v-if="reviews.length !== 0" v-observe-visibility="getMoreReviews"></div>
    </div>
</template>

<script>
import AddReview from '../components/AddReview.vue'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default ({
    name: 'Reviews',
    components: {
        AddReview
    },
    data() {
        return {
            page: 1,
            lastPage: 1,
            reviews: [],
            userReview: null
        }
    },
    props: {
        carId: String
    },
    computed: {
        ...mapGetters(['user', 'getRatingItems'])
    },
    created() {
        this.getReviews()
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
        },
        async getReviews() {
            try {
                const response = await axios.get(`/api/cars/${this.carId}/reviews`, { params: { page: this.page } }, { headers: { 'authorization': `Bearer ${localStorage.getItem('accessToken')}` } })
                this.reviews.push(...response.data.reviews)
                this.userReview = response.data.userReview
                this.lastPage = response.data.lastPage
            } catch (err) {
                console.log(err.response)
            }
        },
        getMoreReviews(isVisible) {
            if (!isVisible) return
            if (this.page >= this.lastPage) return 

            this.page += 1;

            this.getReviews()
        }
    }
})
</script>

<style scoped>
.reviews {
    padding: 4rem 6rem;
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
    .reviews {
        padding: 2rem 7.5%;
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
