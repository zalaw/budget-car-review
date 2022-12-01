<template>
    <div class="details">
        <div class="brands">
            <h1>Marci</h1>
            <div class="row">
                <div class="brand-col">
                    <img src="@/assets/brands/toyota.png" alt="Toyota">
                    <h2>Toyota</h2>
                </div>
                <div class="brand-col">
                    <img src="@/assets/brands/alfa-romeo.png" alt="Alfa Romeo">
                    <h2>Alfa Romeo</h2>
                </div>
                <div class="brand-col">
                    <img src="@/assets/brands/mercedes-benz.png" alt="Mercedes-Benz">
                    <h2>Mercedes-Benz</h2>
                </div>
                <div class="brand-col">
                    <img src="@/assets/brands/lotus.png" alt="Lotus">
                    <h2>Lotus</h2>
                </div>
                <div class="brand-col">
                    <img src="@/assets/brands/dodge.png" alt="Dodge">
                    <h2>Dodge</h2>
                </div>
                <div class="brand-col">
                    <img src="@/assets/brands/mitsubishi.png" alt="Mitsubishi">
                    <h2>Mitsubishi</h2>
                </div>
                <div class="brand-col">
                    <img src="@/assets/brands/porsche.png" alt="Porsche">
                    <h2>Porsche</h2>
                </div>
                <div class="brand-col">
                    <img src="@/assets/brands/lamborghini.png" alt="Lamborghini">
                    <h2>Lamborghini</h2>
                </div>
            </div>
            <h1>Si multe altele</h1>
        </div>

        <div class="steps">
            <div class="row">
                <div class="steps-col">
                    <img src="https://image.freepik.com/free-vector/web-search-concept-illustration_114360-4767.jpg" alt="Browse for cars">
                    <h1>Cautati-va masina dorita</h1>
                    <p>Loem ipsum dolor sit amet consectetur adipisicing elit. Similique aspernatur error inventore dolores obcaecati, adipisci quos? Harum, unde assumenda! Assumenda nemo ab ullam distinctio minus quam in iusto tenetur temporibus?</p>
                </div>
                <div class="steps-col">
                    <img src="https://image.freepik.com/free-vector/book-lover-concept-illustration_114360-1467.jpg" alt="Read reviews">
                    <h1>Cititi recenziile utilizatorilor</h1>
                    <p>Loem ipsum dolor sit amet consectetur adipisicing elit. Id nam voluptates animi ipsam, officiis temporibus dolore. Quos, ipsa doloemque ipsum non libero repellat cupiditate, facere eos mollitia vero reiciendis nobis?</p>
                </div>
                <div class="steps-col">
                    <img src="https://image.freepik.com/free-vector/notebook-concept-illustration_114360-377.jpg" alt="Leave a review">
                    <h1>Lasati o recenzie</h1>
                    <p>Loem ipsum dolor sit amet consectetur adipisicing elit. Suscipit fugit eveniet quaerat deserunt voluptas non voluptatum illum facilis? Doloem error maiores officia cumque dolore ab consequuntur, em ut. Dolorum, alias.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Details'
}
</script>

<style scoped>
.brands {
    width: 100%;
    padding: 3rem 5%;
}

.brands h1 {
    text-align: center;
    font-size: 2em;
    padding: .5rem 0;
}

.brand-col {
    width: 12.5%;
    text-align: center;
    padding: 1%;
}

.brand-col img {
    width: 100%;
    display: block;
    margin-bottom: 1em;
}

.brand-col h2 {
    font-size: .8em;
}

.steps {
    width: 100%;
    padding: 3rem 5%;
}

.steps-col {
    width: 33.33%;
    padding: 0 2%;
}

.steps-col img {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

.steps-col h1 {
    font-size: 1.5em;
    margin-bottom: 1em;
}

@media only screen and (max-width: 640px) {
    .brand-col {
        width: 25%;
        padding: .5rem 5%;
    }

    .brand-col img {
        margin: 0;
    }

    .steps-col {
        width: 100%;
        padding: 2rem 10%;
    }

    .steps-col img {
        height: 30vw;
    }

    .steps-col h1 {
        margin-bottom: .5rem;
    }
}
</style>