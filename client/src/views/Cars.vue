<template>
    <div class="cars-container">
        <div class="filter">
            <img src="../assets/filter.png" alt="Filter">
            <h1>Filtrare</h1>
        </div>
        
        <div class="search">
            <div class="make" @click="handleFilter('.*')">
                <span>Afiseaza toate</span>
            </div>
            <div class="make" v-for="(make, index) in makes" :key="index" @click="handleFilter(make)">
                <span>{{ make }}</span>
            </div>
        </div>
        

        <div class="cars">
            <div v-for="(car, index) in cars" :key="index" class="car-item">
                <a :href="`/car/${car._id}`">
                    <div class="car">
                        <img :src="car.image">
                        <div class="car-text">
                            <h1>{{`${car.year} ${car.make} ${car.model}`}}</h1>
                            <h3>Scorul mediu: {{ car.averageScore }}</h3>
                        </div>
                    </div>
                </a>
            </div>

            <div class="t" v-if="cars.length !== 0" v-observe-visibility="fetchMore"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default ({
    name: 'Cars',
    data() {
        return {
            page: 1,
            lastPage: 1,
            filter: '.*',
            makes: [],
            cars: []
        }
    },
    created() {
        this.getMakes()
        this.fetch()
    },
    methods: {
        async getMakes() {
            try {
                const response = await axios.get('/api/makes')
                this.makes = response.data.makes
            } catch (err) {
                console.log(err)
            }
        },
        async fetch() {
            try {
                const response = await axios.get('/api/cars', { params: { make: this.filter, page: this.page } })
                this.lastPage = response.data.lastPage
                this.cars.push(...response.data.cars)
            } catch (err) {
                console.log(err.response)
            }
        },
        async handleFilter(make) {
            this.page = 1
            this.filter = make
            this.cars = []
            this.fetch()
        },
        fetchMore(isVisible) {
            if (!isVisible) return
            if (this.page >= this.lastPage) return 
            
            this.page += 1;

            this.fetch()
        }
    }
})
</script>

<style scoped>
.t {
    width: 100%;
    height: 10px;
}
.filter {
    display: flex;
    align-items: center;
    padding: 0 .5rem;
}

.filter img {
    width: 24px;
    margin-right: .5rem;
}

.search {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;
}

.make {
    font-weight: bold;
    margin: .5rem;
    cursor: pointer;
}

.make:hover {
    color: #1AC8DB;
}




.cars-container {
    padding: 8rem 5%;
}

.options {
    position: relative;
}

.col-search {
    width: 70%;
    position: relative;
    left: 0;
}

.col-sort {
    position: absolute;
    width: 30%;
    right: 0;
}

.cars {
    display: flex;
    flex-wrap: wrap;
}

.car-item {
    width: 33.33%;
    position: relative;
    padding: 1%;
}

.car {
    width: 100%;
    height: 100%;
    position: relative;
    color: white;
    overflow: hidden;
    font-size: 1vw;
}

.car::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #0e193e;
    opacity: 0.5;
    z-index: 100;
}

.car:hover > img {
    transform: scale(1.125);
}

.car-item img {
    width: 100%;
    height: 18vw;
    object-fit: cover;
    display: block;
    position: relative;
    overflow: hidden;
    transition: .3s;
}

.car-text {
    position: absolute;
    bottom: 2rem;
    width: 100%;
    text-align: center;
    padding: 0 .5rem;
    z-index: 101;
}

@media only screen and (max-width: 900px) {
    .car-item {
        width: 50%;
        padding: 2%;
    }

    .car-item img {
        height: 25vw;
    }

    .car {
        font-size: 1.5vw;
    }
}

@media only screen and (max-width: 640px) {
    .car-item {
        width: 100%;
        padding: 5%;
    }

    .car-item img {
        height: 50vw;
    }

    .car {
        font-size: 3vw;
    }
}

/*
.cars {
    padding: 8rem 5%;
}

.car-item {
    margin: 4rem 0;
}

.col-image {
    width: 30%;
}

.col-image img {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

.col-car {
    padding: 0 2rem;
    width: 70%;
    position: relative;
}

.col-car p {
    margin: 1rem 0;
}

.read-more-link {
    display: inline-block;
    background-color: #1AC8DB;
    padding: .25rem 1rem;
    border: 4px solid #1AC8DB;
    color: white;
    font-weight: bold;
    transition: .3s;
}

.read-more-link:hover {
    background-color: white;
    color: #1AC8DB;
}

.score {
    font-weight: bold;
}
*/
</style>
