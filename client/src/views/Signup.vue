<template>
        <Unauthorized v-if="user !== null" message="Already logged in" />

        <div v-else class="container">
            <MessageBox v-if="getMessage" :message="getMessage" />

            <div class="content">
                <div class="row">
                    <div class="col-signup">
                        <div class="form">
                            <form @submit.prevent="signup">
                                <h1>Inregistrare</h1>
                                <div class="input">
                                    <label for="name">Nume</label>
                                    <input id="name" type="text" v-model="name" placeholder="Nume">
                                </div>
                                <div class="input">
                                    <label for="email">Email</label>
                                    <input id="email" type="email" v-model="email" placeholder="Email">
                                </div>
                                <div class="input">
                                    <label for="password">Parola</label>
                                    <input id="password" type="password" v-model="password" placeholder="Parola">
                                </div>
                                <div class="input">
                                    <label for="repeat-password">Repetare parola</label>
                                    <input id="repeat-password" type="password" v-model="repeatPassword" placeholder="Repetare parola">
                                </div>
                                <div class="input">
                                    <button id="signup">Inregistrare</button>
                                </div>
                                <div class="redirect">
                                    <p>Sunteti inregistrat deja? <router-link to="/login">Autentificati-va</router-link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-signup">
                        <div class="block">
                            <div class="text">
                                <h1>Bine ati venit la inregistrare</h1>
                                <p>Sunteti inregistrat deja?</p>
                                <router-link id="login" to="/login">Autentificati-va</router-link>
                            </div>
                        </div>
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
    name: 'Signup',
    components: {
        Unauthorized,
        MessageBox
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
        }
    },
    computed: {
        ...mapGetters(['user', 'getMessage'])
    },
    created() {
        this.$store.dispatch('setMessage', null)
    },
    methods: {
        async signup() {
            try {
                if (this.name === '' || this.email === '' || this.password == '' || this.repeatPassword == '') {
                    this.showMessage({ title: 'Client side error', message: 'Toate campurile trebuie completate!', isError: true })
                    return
                }

                if (this.password !== this.repeatPassword) {
                    this.showMessage({ title: 'Client side error', message: 'Parolele nu se potrivesc!', isError: true })
                    return
                }

                const response = await axios.post('/auth/signup', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })

                this.showMessage({ title: 'Success', message: response.data.message, isError: false })
                this.resetFields()
            } catch (err) {
                this.showMessage({ title: err.response.statusText, message: err.response.data.error.message, isError: true })
            }
        },
        showMessage(message) {
            this.$store.dispatch('setMessage', { title: message.title, message: message.message, isError: message.isError })
            this.password = ''
            this.repeatPassword = ''
        },
        resetFields() {
            this.name = ''
            this.email = ''
            this.password = ''
            this.repeatPassword = ''
        }
    }
}
</script>

<style scoped>
.col-signup {
    width: 50%;
}

.redirect {
    display: none;
}

.container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('../assets/backgrounds/signup-background.jpg');
    background-position: center center;
    background-size: cover;
}

.container::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #0e193e;
    opacity: 0.7;
}

.content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 840px;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 21px -3px rgba(115,115,115,0.75);
    -webkit-box-shadow: 0px 0px 21px -3px rgba(115,115,115,0.75);
    -moz-box-shadow: 0px 0px 21px -3px rgba(115,115,115,0.75);
}
.form {
    background-color: white;
    padding: 4rem;
}

.form h1 {
    margin-bottom: 2rem;
}

.input {
    margin: 1.5rem 0;
}

.input label, .input input, #signup {
    display: block;
    width: 100%;
}

.input label {
    font-weight: bold;
    text-transform: uppercase;
    font-size: .85rem;
    margin-bottom: .5rem;
}

.input input {
    border: none;
    background-color: rgb(230, 230, 230);
    padding: .75rem 1.25rem;
}

#signup {
    padding: .75rem 1.25rem;
    background-color: #1AC8DB;
    border: none;
    color: white;
    cursor: pointer;
    border: 4px solid transparent;
    transition: .3s;
    text-transform: uppercase;
    font-weight: bold;
}

#signup:hover {
    background-color: white;
    color:#1AC8DB;
    border: 4px solid #1AC8DB;
}

.block {
    background-color: #1AC8DB;
    text-align: center;
    position: relative;
    height: 100%;
    color: white;
}

.text {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(0, -50%)
}

.text h1, .text p {
    margin-bottom: 1rem;
}

#login {
    display: inline-block;
    border: 2px solid white;
    padding: .75rem 2rem;
    color: white;
    text-decoration: none;
    transition: .3s;
}
#login:hover {
    background-color: white;
    color: #1AC8DB;
}

@media only screen and (max-width: 900px) {
    .nav-links {
        display: none;
    }

    .row {
        width: 90%;
        margin: 0 auto;
    }

    .form {
        width: 100%;
        padding: 10%;
    }

    .content {
        width: 100%;
    }
}

@media only screen and (max-width: 640px) {
    .block {
        display: none;
    }

    .col-signup {
        width: 100%;
    }

    .redirect {
        display: block;
    }

    .input {
        margin: .5rem 0;
    }
}
</style>