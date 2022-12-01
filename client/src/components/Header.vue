<template>
    <div class="header">
        <div class="header-text">
            <h1>CarReview</h1>
            <h3>Cautati-va masina visurilor dumneavoastra. Obtineti informatii. Lasati o recenzie</h3>
            <router-link class="link browse-cars" to="/cars">Cautati vehicule</router-link>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.header {
    position: relative;
    height: 90vh;
    width: 100%;
    background-image: url('../assets/backgrounds/main.jpg');
    background-position: center center;
    background-size: cover;
}

.header::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #0e193e;
    opacity: 0.7;
}

.header-text {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(0, -50%);
    color: white;
    text-align: center;
}

.header-text h1 {
    font-size: 4em;
    text-transform: uppercase;
}

.header-text h3 {
    margin: 2em 0;
}

.browse-cars {
    color: white;
    display: inline-block;
    background-color: #1AC8DB;
    border: 4px solid transparent;
    padding: .75em 1.5em;
    text-transform: uppercase;
    font-weight: bold;
    transition: .3s;
}

.browse-cars:hover {
    background-color: transparent;
    border: 4px solid #1AC8DB;
}

@media only screen and (max-width: 640px) {
  .header-text {
    font-size: .8em;
    padding: 0 2rem;
  }
}
</style>