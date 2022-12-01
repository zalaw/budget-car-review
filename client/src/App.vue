<template>
    <div class="body">
        <Nav />
        <router-view class="container" />
    </div>
</template>

<script>
import axios from 'axios'
import Nav from './components/Nav.vue'

export default {
    name: 'App',
    components: {
        Nav
    },
    async created() {
        try {
            const response = await axios.get('/auth/user')
            this.$store.dispatch('user', response.data.user)
        } catch (err) {
            console.log(err)
            localStorage.removeItem('accessToken')
        }
    }
}
</script>


<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    height: 100%;
}

body {
    font-family: 'Open Sans', sans-serif;
    height: 100%;
}

.container {
    position: relative;
    width: 100%;
}

.row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.link {
    text-decoration: none;
    color: black;
}

.col-6 {
    width: 50%;
}


@media only screen and (max-width: 800px) {
  body {
    font-size: .9em;
  }
}

@media only screen and (max-width: 640px) {
  body {
    font-size: .8em;
  }
}
</style>
