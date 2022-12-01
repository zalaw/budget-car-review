<template>
    <div class="admin">
        <div v-if="car.image !== ''" class="image-preview">
            <img :src="car.image" :alt="`${car.year} ${car.make} ${car.model}`">
        </div>

        <Unauthorized v-if="user === null || user.role !== 'admin'" message="Neautorizat" />
        <div v-else class="admin-container">
            <MessageBox v-if="getMessage" :message="getMessage" />

            <div class="row">
                <div class="form">
                    <h1>Adauga masina</h1>
                    <form @submit.prevent="addCar">
                        <div class="form-input">
                            <label for="year">Anul fabricatiei</label>
                            <input id="year" type="number" v-model="car.year">
                        </div>
                        <div class="form-input">
                            <label for="make">Marca</label>
                            <input id="make" type="text" v-model="car.make">
                        </div>
                        <div class="form-input">
                            <label for="model">Model</label>
                            <input id="model" type="text" v-model="car.model">
                        </div>
                        <div class="form-input">
                            <label for="image-url">URL-ul imaginii</label>
                            <input id="image-url" type="text" v-model="car.image">
                        </div>
                        <div class="form-input">
                            <label for="description">Descriere</label>
                            <textarea id="description" v-model="car.description" rows="10"></textarea>
                        </div>
                        <div class="form-input">
                            <button>Adauga</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Unauthorized from '../components/Unauthorized.vue'
import MessageBox from '../components/MessageBox.vue'

export default {
    name: 'Admin',
    components: {
        Unauthorized,
        MessageBox
    },
    data() {
        return {
            car: {
                year: new Date().getFullYear(),
                make: '',
                model: '',
                image: '',
                description: ''
            }
        }
    },
    computed: {
        ...mapGetters(['user', 'getMessage'])
    },
    methods: {
        async addCar() {
            try {
                const response = await axios.post('/api/cars', { car: this.car }, { headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } })

                this.car.year = new Date().getFullYear()
                this.car.make = ''
                this.car.model = ''
                this.car.image = ''
                this.car.description = ''

                this.showMessage({ title: 'Success', message: response.data.message, isError: false })
            } catch (err) {
                this.showMessage({ title: err.response.statusText, message: err.response.data.error.message, isError: true })
            }
        },
        showMessage(message) {
            this.$store.dispatch('setMessage', { title: message.title, message: message.message, isError: message.isError })
        }
    }
}
</script>

<style scoped>
.image-preview {
    position: absolute;
    width: 100%;
    height: 100%;
}

.image-preview::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #0e193e;
    opacity: 0.7;
}

.image-preview img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}

.admin {
    background-image: url('../assets/backgrounds/admin-background.jpg');
    background-position: center center;
    background-size: cover;
}

.admin::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #0e193e;
    opacity: 0.7;
}

.admin-container {
    padding: 8rem 5%;
    position: relative;
}

.form {
    background-color: white;
    padding: 2rem 4rem;
    width: 640px;
}

.form-input {
    display: block;
    margin: 1rem 0;
}

.form-input label, .form-input input, .form-input textarea {
    display: block;
    width: 100%;
}

.form-input label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: .8rem;
    background-color: #1AC8DB;
    color: white;
    padding: .5rem;
}

.form-input input, .form-input textarea {
    padding: .5rem;
    
}

.form-input textarea {
    min-width: 100%;
    max-width: 100%;
    min-height: 200px;
}

.form-input button {
    width: 100%;
    padding: .75rem;
    font-size: 1rem;    
    background-color: #1AC8DB;
    border: 4px solid #1AC8DB;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: .3s;
    margin-top: 1rem;
}

.form-input button:hover {
    background-color: white;
    color: #1AC8DB;
}
</style>
