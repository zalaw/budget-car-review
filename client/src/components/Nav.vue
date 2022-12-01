<template>
    <div class="nav">
        <div class="logo">
            <router-link class="link home-link" to="/" @click.native="scrollToTop">CarReview</router-link>
        </div>

        <div class="nav-links">
            <ul class="common-links">
                <li><router-link class="link" to="/" @click.native="scrollToTop">Acasa</router-link></li>
                <li><router-link class="link" to="/rating-system" @click.native="scrollToTop">Sistemul de evaluare</router-link></li>
                <li><router-link class="link" to="/cars" @click.native="scrollToTop">Vehicule</router-link></li>
            </ul>

            <ul v-if="!user" class="logged-out">
                <li><router-link class="link signup" to="/signup">Inregistrare</router-link></li>
                <li><router-link class="link login" to="/login">Autentificare</router-link></li>
            </ul>

            <ul v-if="user" class="logged-in">
                <li v-if="user.role === 'admin'"><router-link class="link" to="/admin">Admin</router-link></li>
                <li class="user">
                    <a class="link" href="javascript:void(0)">{{ user.name }} ▼</a>
                    <ul class="user-nav">
                        <li><a class="link" href="/my-reviews">Recenziile mele</a></li>
                        <li><a class="link" href="javascript:void(0)" @click="logout">Deconectare</a></li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="hamburger" @click="this.toggleResponsiveMenu">
            <span>≡</span>
        </div>

        <div @click="this.toggleResponsiveMenu" class="responsive-menu">
            <router-link class="link-responsive" to="/" @click.native="scrollToTop">Acasa</router-link>
            <router-link class="link-responsive" to="/rating-system" @click.native="scrollToTop">Sistemul de evaluare</router-link>
            <router-link class="link-responsive" to="/cars" @click.native="scrollToTop">Vehicule</router-link>

            <div v-if="user">
                <p class="user">Autentificat ca {{ user.name }}</p>
                <router-link v-if="user.role === 'admin'" class="link-responsive" to="/admin">Admin</router-link>
                <a class="link-responsive" href="/my-reviews">Recenziile mele</a>
                <a class="link-responsive" href="javascript:void(0)" @click="logout">Deconectare</a>
            </div>
            <div v-else>
                <router-link class="link-responsive signup-responsive" to="/signup">Inregistrare</router-link>
                <router-link class="link-responsive login-responsive" to="/login">Autentificare</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Nav',
    data() {
        return {
            showUserOptions: false
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        toggleResponsiveMenu() {
            const menu = document.getElementsByClassName('responsive-menu')[0]
            menu.classList.toggle('show')
        },
        scrollToTop() {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        },
        logout() {
            localStorage.removeItem('accessToken')
            this.$store.dispatch('user', null)
            this.$router.push('/').catch(() => {})
        }
    },
    mounted() {
        this.showUserOptions = false
    }
}
</script>

<style scoped>
.user {
    color: gold;
    text-align: center;
    padding: 1rem 0;
}
.signup-responsive {
    background-color: #1AC8DB;
    display: inline-block;
}
.login-responsive {
    background-color: white;
    color: black !important;
}
.show {
    display: block !important;
}

.responsive-menu {
    display: none;
    background-color: black;
    position: relative;
    top: 100%;
    padding: 2rem 0;
    font-weight: bold;
    height: calc(100vh - 64px);
}

.link-responsive {
    display: block;
    padding: 1rem 0;
    text-align: center;
    color: white;
    text-decoration: none;
}

.hamburger {
    position: absolute;
    display: none;
    right: 2rem;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 2rem;
    padding: 0 1rem;
    cursor: pointer;
}
.nav {
    position: fixed;
    z-index: 1000;
    width: 100%;
    background-color: white;
    height: 64px;
    box-shadow: 0px -10px 13px 8px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px -10px 13px 8px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px -10px 13px 8px rgba(0,0,0,0.75);
}

.logo {
    position: absolute;
    left: 4rem;
    height: 100%;
}

.logo .link {
    display: flex;
    height: 100%;
    vertical-align: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.5em;
}

.nav-links {
    position: absolute;
    right: 4rem;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}

.nav-links ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    height: 100%;
}

.nav-links ul li {
    margin-left: 1rem;
    font-weight: bold;
    font-size: .9em;
    height: 100%;
}

.nav-links .link {
    display: flex;
    height: 100%;
    vertical-align: center;
    align-items: center;
    font-weight: bold;
}

.link:hover {
    color: #1AC8DB;
}

.user-nav {
    display: none !important;
    position: absolute;
    height: 100%;
    top: 100%;
    right: 0;
}

.user-nav li {
    margin: 0 !important;
    height: 80% !important;
    padding: 0 1rem !important;
    display: block;
    background-color: white;
    box-shadow: 0px 5px 14px -4px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 5px 14px -4px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 5px 14px -4px rgba(0,0,0,0.75);
}

.user:hover > .user-nav {
    display: block !important;
}

.user:active > .user-nav {
    display: block !important;
}

.signup {
    background-color: #1AC8DB;
    color: white;
    transition: .3s;
    height: initial !important;
    top: 50%;
    position: relative;
    padding: .5rem;
    transform: translate(0, -50%);
    border: 4px solid #1AC8DB;
}

.signup:hover {
    background-color: transparent;
    color: #1AC8DB;
}

.login {
    background-color: black;
    color: white;
    transition: .3s;
    height: initial !important;
    top: 50%;
    position: relative;
    padding: .5rem;
    transform: translate(0, -50%);
    border: 4px solid black;
}

.login:hover {
    background-color: white;
    color: black;
}

@media only screen and (max-width: 780px) {
    .nav-links {
        display: none;
    }

    .nav-links {
        display: none;
    }

    .hamburger {
        display: block;
    }

    .logo {
        left: 2rem;
    }

    .login:hover {
        background-color: white;
        color: black;
    }
}
</style>