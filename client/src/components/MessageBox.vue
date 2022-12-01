<template>
    <div :class="`${message.isError ? 'error-light' : 'success-light'} message-box`">
        <div class="close" @click="close">x</div>

        <div :class="`${message.isError ? 'error-dark' : 'success-dark'} left`">
            <img :src="message.isError ? getImage('error.png') : getImage('success.png')" :alt="message.isError ? 'Error' : 'Success'">
        </div>

        <div class="right">
            <div class="text">
                <h1>{{ message.title }}</h1>
                <p>{{ message.message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default ({
    name: 'MessageBox',
    props: {
        message: Object
    },
    methods: {
        close() {
            this.$store.dispatch('setMessage', null)
        },
        getImage(image) {
            return require(`../assets/${image}`)
        }
    }
})
</script>

<style scoped>
.message-box {
    position: fixed;
    min-width: 480px;
    max-width: 640px;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 96px;
    z-index: 1001;
    display: flex;
    flex-wrap: wrap;
    color: white;
    box-shadow: 0px 0px 21px -3px rgba(115,115,115,0.75);
    -webkit-box-shadow: 0px 0px 21px -3px rgba(115,115,115,0.75);
    -moz-box-shadow: 0px 0px 21px -3px rgba(115,115,115,0.75);
}

.left {
    position: relative;
    width: 25%;
}

.left img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
}

.right {
    width: 75%;
    padding: 2rem 1rem;
}

.right h1 {
    font-size: 1.25rem;
}

.error-dark {
    background-color: #d13854;
}

.success-dark {
    background-color: #399e36;
}

.error-light {
    background-color: #d15c6f;
}

.success-light {
    background-color: #57b45b;
}

.close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    padding: 0 .5rem;
    z-index: 100;
    font-size: 1.5rem;
    transition: .3s;
}

.close:hover {
    background-color: white;
    color: black;
}
</style>
