<template>
        <Unauthorized v-if="user !== null" message="Sunteti deja autentificat" />

        <div v-else class="container">
            <MessageBox v-if="getMessage" :message="getMessage" />

            <div class="content">
                <div class="row">
                    <div class="col-login">
                        <div class="form">
                            <form @submit.prevent="login">
                                <h1>Autentificare</h1>
                                <div class="input">
                                    <label for="email">Email</label>
                                    <input id="email" type="email" v-model="email" placeholder="Email">
                                </div>
                                <div class="input">
                                    <label for="password">Parola</label>
                                    <input id="password" type="password" v-model="password" placeholder="Parola">
                                </div>
                                <div class="input">
                                    <button id="login">Autentificare</button>
                                </div>
                                <div class="redirect">
                                    <p>Nu aveti cont? <router-link to="/signup">Inregistrati-va</router-link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-login">
                        <div class="block">
                            <div class="text">
                                <h1>Bine ati venit la autentificare</h1>
                                <p>Nu aveti cont?</p>
                                <router-link id="signup" to="/signup">Inregistrati-va</router-link>
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
    name: 'Login',
    components: {
        Unauthorized,
        MessageBox
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapGetters(['user', 'getMessage']),
    },
    created() {
        this.$store.dispatch('setMessage', null)
    },
    methods: {
        async login() {
            try {
                if (this.email === '' || this.password === '') {
                    this.showMessage({ title: 'Client side error', message: 'Toate campurile trebuie completate!', isError: true })
                    return
                }

                const response = await axios.post('/auth/login', {
                    email: this.email,
                    password: this.password
                })

                localStorage.setItem('accessToken', response.data.accessToken)
                this.$store.dispatch('user', response.data.user)
                this.$router.push('/')
            } catch(err) {
                this.showMessage({ title: err.response.statusText, message: err.response.data.error.message, isError: true })
            }
        },
        showMessage(message) {
            this.$store.dispatch('setMessage', { title: message.title, message: message.message, isError: message.isError })
            this.password = ''
        }
    }
}
</script>

<style scoped>
.col-login {
    width: 50%;
}

.redirect {
    display: none;
}

.container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('../assets/backgrounds/login-background.jpg');
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

.input label, .input input, #login {
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

#login {
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

#login:hover {
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

#signup {
    display: inline-block;
    border: 2px solid white;
    padding: .75rem 2rem;
    color: white;
    text-decoration: none;
    transition: .3s;
}
#signup:hover {
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

    .col-login {
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