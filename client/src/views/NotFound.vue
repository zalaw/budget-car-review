<template>
    <div class="content">
        <div class="not-found">
            <h1>404 - Nu am gasit</h1>
            <router-link class="link link-home" to="/">Acasa</router-link>
        </div>
    </div>
</template>

<script>
export default ({
    name: 'NotFound'
})
</script>

<style scoped>
.content {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('../assets/backgrounds/not-found.jpg');
    background-position: center center;
    background-size: cover;
}

.content::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #0e193e;
    opacity: 0.7;
}

.not-found {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
}

.not-found h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
}

.link-home {
    color: white;
    display: inline-block;
    background-color: #1AC8DB;
    border: 4px solid transparent;
    padding: .75em 1.5em;
    text-transform: uppercase;
    font-weight: bold;
    transition: .3s;
}

.link-home:hover {
    background-color: transparent;
    border: 4px solid #1AC8DB;
}
</style>
