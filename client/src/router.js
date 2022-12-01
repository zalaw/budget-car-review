import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import RatingSystem from './views/RatingSystem.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Car from './views/Car.vue'
import Cars from './views/Cars.vue'
import Admin from './views/Admin.vue'
import NotFound from './views/NotFound.vue'
import MyReviews from './views/MyReviews.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/rating-system',
            component: RatingSystem
        },
        {
            path: '/my-reviews',
            component: MyReviews
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/signup',
            component: Signup
        },
        {
            path: '/admin',
            component: Admin
        },
        {
            path: '/cars',
            component: Cars
        },
        {
            path: '/car/:id',
            props: true,
            component: Car
        },
        {
            path: '*',
            component: NotFound
        }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
})