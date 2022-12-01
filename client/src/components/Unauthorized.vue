<template>
    <div class="unauthorized">
        <div class="message">
            <h1>{{ message }}</h1>
        </div>
    </div>
</template>

<script>
export default ({
    name: 'Unauthorized',
    props: {
        message: String
    }
})
</script>

<style scoped>
.unauthorized {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-image: url('/assets/backgrounds/unauthorized.jpg');
    background-position: center center;
    background-size: cover;
}

.unauthorized::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #0e193e;
    opacity: 0.7;
}

.message {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    font-size: 4em;
}
</style>
