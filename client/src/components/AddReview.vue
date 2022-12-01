<template>
    <div class="add-review">
        <form @submit.prevent="addReview">
            <h1 style="margin-bottom: 1rem;">Adaugati recenzie</h1>
            <div class="row">
                <div class="col-add-review">
                    <h1>Zilnic</h1>
                    <div class="col-container">
                        <div class="item" v-for="(item, index) in getRatingItems.daily" :key="index">
                            <div class="item-image">
                                <img :src="item.image" :alt="item.text">
                            </div>
                            <div class="item-text">
                                <h3>{{ item.text }}</h3>
                            </div>
                            <div class="item-input">
                                <input v-model="review.daily[item.field]" type="number" min=1 max=10>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-add-review">
                    <h1>Weekend</h1>
                    <div class="col-container">
                        <div class="item" v-for="(item, index) in getRatingItems.weekend" :key="index">
                            <div class="item-image">
                                <img :src="item.image" :alt="item.text">
                            </div>
                            <div class="item-text">
                                <h3>{{ item.text }}</h3>
                            </div>
                            <div class="item-input">
                                <input v-model="review.weekend[item.field]" type="number" min=1 max=10>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="textarea">
                    <textarea v-model="review.comment" rows="6" placeholder="Comentariu (optional)"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="submit">
                    <button type="submit">Adaugati</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'AddReview',
    props: {
        carId: String
    },
    data() {
        return {
            review: {
                daily: {
                    features: 5,
                    comfort: 5,
                    quality: 5,
                    practicality: 5
                },
                weekend: {
                    styling: 5,
                    acceleration: 5,
                    handling: 5,
                    coolFactor: 5
                },
                comment: ''
            }
        }
    },
    computed: {
        ...mapGetters(['user', 'getRatingItems'])
    },
    methods: {
        async addReview() {
            try {
                const data = {
                    carId: this.carId,
                    review: this.review
                }
                const response = await axios.post('/api/reviews', { data }, { headers: { 'authorization': `Bearer ${localStorage.getItem('accessToken')}` } })
                console.log(response)
                window.location.reload(true)
            } catch (err) {
                console.log(err.response)
            }
        }
    }
}
</script>

<style scoped>
.add-review {
    padding: 2rem 0;
}

form {
    max-width: 840px;
    margin: auto;
}
.col-add-review {
    width: 50%;
}

.col-add-review h1 {
    margin-bottom: .5rem;
}

.col-container {
    display: flex;
    flex-wrap: wrap;
}

.item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: .25rem;
}

.item-image img {
    width: 24px;
    display: block;
    margin-right: .25rem;
}

.item-text {
    margin-right: .25rem;
    font-size: .8em;
}

.item-input input {
    width: 48px;
    padding: .5rem .25rem;
}

.textarea {
    width: 100%;
    margin-top: .5rem;
}

.textarea textarea {
    width: 100%;
    padding: .5rem .75rem;
    min-width: 100%;
    max-width: 100%;
    min-height: 100px;
}

.submit {
    margin-top: .5rem;
    width: 100%;
}

.submit button {
    width: 100%;
    padding: .5rem;
    background-color: #1AC8DB;
    border: 4px solid #1AC8DB;
    color: white;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    transition: .3s;
}

.submit button:hover {
    background-color: transparent;
    color: #1AC8DB;
}
</style>