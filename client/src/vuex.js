import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ratingItems: {
            daily: [
                {
                    text: 'Caracteristici',
                    field: 'features',
                    image: require('@/assets/category-icons/features.png'),
                    description: 'Reprezinta cat de bine o masina este echipata'
                },
                {
                    text: 'Confort',
                    field: 'comfort',
                    image: require('@/assets/category-icons/comfort.png'),
                    description: 'Se axeaza pe netezime, calitatea calatoriei si pe luxul masinii'
                },
                {
                    text: 'Calitate',
                    field: 'quality',
                    image: require('@/assets/category-icons/quality.png'),
                    description: 'Reprezinta cat de bine este construita masina'
                },
                {
                    text: 'Practicabilitate',
                    field: 'practicality',
                    image: require('@/assets/category-icons/practicality.png'),
                    description: 'Ia in considerare cat de practic este de utilizat o masina, cat spatie de incarcare are si ce economie de combustibil are'
                }
            ],
            weekend: [
                {
                    text: 'Aspect',
                    field: 'styling',
                    image: require('@/assets/category-icons/styling.png'),
                    description: 'Reprezinta aspectul vehiculului si cat de bine arata in comparatie cu alte vehicule'
                },
                {
                    text: 'Acceleratie',
                    field: 'acceleration',
                    image: require('@/assets/category-icons/acceleration.png'),
                    description: 'Reprezinta cat de rapid masina atinge viteza de 100km/h'
                },
                {
                    text: 'Manevrabilitate',
                    field: 'handling',
                    image: require('@/assets/category-icons/handling.png'),
                    description: 'Reprezinta modul in care un vehicul raspunde la comenzile soferului, precum si modul in care se deplaseaza de-a lungul unei piste'
                },
                {
                    text: 'Factorul Cool',
                    field: 'coolFactor',
                    image: require('@/assets/category-icons/cool-factor.png'),
                    description: 'Este o combinatie intre cat de cool este masina dar si cat de importanta este'
                }
            ],
        },
        user: null,
        cars: null,
        message: null
    },
    getters: {
        getRatingItems: (state) => { return state.ratingItems },
        user: (state) => { return state.user },
        getCars: (state) => { return state.cars },
        getMessage: (state) => { return state.message }
    },
    actions: {
        user(context, user) {
            context.commit('user', user)
        },
        setCars(context, cars) {
            context.commit('setCars', cars)
        },
        setMessage(context, message) {
            context.commit('setMessage', message)
        }
    },
    mutations: {
        user(state, user) {
            state.user = user
        },
        setCars(state, cars) {
            state.cars = cars
        },
        setMessage(state, message) {
            state.message = message
        }
    }
})