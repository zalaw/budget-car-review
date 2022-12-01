<template>
    <div class="rating-system">
        <h1 style="margin-bottom: 2rem;">Sistemul de evaluare</h1>

        <div class="row">
            <div class="col-rating">
                <div class="daily">
                    <h1>Zilnic</h1>
                    <div class="daily-container">
                        <div class="row">
                            <div v-for="(item, index) in getRatingItems.daily" :key="index" class="item">
                                <img :src="item.image" :alt="item.text">
                                <h3>{{ item.text }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-rating">
                <div class="weekend">
                    <h1>Weekend</h1>
                    <div class="weekend-container">
                        <div class="row">
                            <div v-for="(item, index) in getRatingItems.weekend" :key="index" class="item">
                                <img :src="item.image" :alt="item.text">
                                <h3>{{ item.text }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <router-link style="margin-top: 2rem;" class="link" to="/rating-system">Aflati mai multe detalii despre sistemul de evaluare</router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default ({
    name: 'RatingSystem',
    computed: {
        ...mapGetters(['getRatingItems'])
    }
})
</script>

<style scoped>
.rating-system {
    width: 100%;
    padding: 5%;
}

.rating-system h1 {
    text-align: center;
}

.daily, .weekend {
    width: 100%;
    position: relative;
    text-transform: uppercase;
    padding: 1rem;
}

.daily h1, .weekend h1 {
    background-color: #1AC8DB;
    color: white;
    text-align: center;
    padding: .5rem 0;
}

.daily-container, .weekend-container {
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
}

.item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: .75rem;
    font-size: .8rem;
}

.item img {
    width: 32px;
    margin-right: .5rem;
}

.link {
    background-color: black;
    color: white;
    padding: .5rem 1rem;
    border: 4px solid black;
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    transition: .3s;
}

.link:hover {
    background-color: transparent;
    color: black;
}

.col-rating {
    width: 50%;
}

@media only screen and (max-width: 640px) {
    .col-rating {
        width: 100%;
    }

    .daily h1, .weekend h1 {
        margin: 0;
    }

    .item {
        font-size: .8em;
        margin: .5rem;
    }

    .item img {
        width: 24px;
        margin-right: .25rem;
    }
}
</style>
