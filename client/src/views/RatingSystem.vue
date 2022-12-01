<template>
    <div class="rating-system">
        <div class="row">
            <div class="col-rating">
                <div class="rating-content">
                    <h1>Sistemul de evaluare</h1>
                    <p>Exista 8 categorii separate, fiecare avand un scor de la <b>1</b> la <b>10</b> - <b>1</b> fiind cel mai slab iar <b>10</b> fiind cel mai bun.</p>
                    <p>Cele 8 categorii sunt separate in 2 grupuri: <b>Zilnic</b> si <b>Weekend</b>.</p>
                    <p>Categoria <b>Zilnic</b> se concentreaza pe viabilitatea si practicitatea unei masini, in timp ce categoria <b>Weekend</b> masoara atractia masinilor pentru entuziasti.</p>
                    <p>Fiecare masina este evaluata impotriva tuturor celorlalte masini. Acesta este un punct important deoarece inseamna ca aceste categorii nu sunt relative ci mai degraba absolute.</p>
                </div>
            </div>

            <div class="col-rating">
                <div class="rating-remember">
                    <h1>Tineti minte:</h1>
                    <p>Scopul acestui sistem este de a ajuta utilizatorii sa inteleaga mai bine specificatiile masinilor.</p>
                    <p>Recenziile trebuie sa fie cat mai obiective si cat mai specifice masinii evaluate.</p>
                    <p>Odata ce recenzia dumneavoastra a fost postata aceasta nu mai poate fi modificata si nici stearsa, va rugam postati cu atentie.</p>
                </div>
            </div>
        </div>

        <div class="about-rating">

            <div class="row row1">
                <h1 class="h">Zilnic</h1>
                <div class="daily">
                    <div class="daily-item" v-for="(item, index) in getRatingItems.daily" :key="index">
                        <div class="item-header">
                            <img :src="item.image" :alt="item.text">
                            <h1>{{ item.text }}</h1>
                        </div>
                        
                        <div class="item-description">
                            <p>{{ item.description }}</p>
                        </div> 
                    </div>
                </div>
            </div>

            <div class="row row2">
                <h1 class="h">Weekend</h1>
                <div class="weekend">
                    <div class="weekend-item" v-for="(item, index) in getRatingItems.weekend" :key="index">
                        <div class="item-header">
                            <img :src="item.image" :alt="item.text">
                            <h1>{{ item.text }}</h1>
                        </div>
                        
                        <div class="item-description">
                            <p>{{ item.description }}</p>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
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
.row1 {
    margin-bottom: 6rem;
}

.col-rating {
    width: 50%;
}

.h {
    background-color: #1AC8DB;
    width: 100%;
    padding: 1rem;
    text-align: center;
    color: white;
    text-transform: uppercase;
}
.about-rating {
    padding: 8rem 0;
}

.daily, .weekend {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.daily-item, .weekend-item {
    width: 25%;
    padding: 1rem;
}

.item-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-size: .7rem;
}

.item-header img {
    width: 32px;
    margin-right: .5rem;
}

.rating-system {
    width: 100%;
    padding: 8rem 5%;
}

.rating-content, .rating-remember {
    background-color: #1AC8DB;
    color: white;
    padding: 10%;
    height: 100%;
}

.rating-content h1, .rating-remember h1 {
    margin-bottom: 2rem;
}

.rating-content p, .rating-remember p {
    margin-bottom: 1rem;
}

@media only screen and (max-width: 900px) {
    .h{
        padding: .5rem 0;
    }

    .item-header {
        font-size: .6rem;
    }

    .daily, .weekend {
        font-size: .9rem;
    }

    .daily-item, .weekend-item {
        padding: .5rem;

    }
}

@media only screen and (max-width: 640px) {
    .daily-item, .weekend-item {
        width: 50%;
    }

    .rating-content, .rating-remember {
        padding: 8%;
    }

    .col-rating {
        width: 100%;
    }
}
</style>