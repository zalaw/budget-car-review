<template>
    <div>
        <Header />
        <Details />
        <RatingSystem />
    </div>
</template>

<script>
import Header from '@/components/Header'
import Details from '@/components/Details'
import RatingSystem from '@/components/RatingSystem'

export default {
    name: 'Home',
    components: {
        Header,
        Details,
        RatingSystem
    }
}
</script>

<style scoped>

</style>
