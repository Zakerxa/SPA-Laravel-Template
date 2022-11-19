import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/",
        name: "Home",
        component: require('./components/Home.vue').default
    },
    {
        path: "/login",
        name: "Login",
        component: require('./auth/Login.vue').default
    },
    {
        path: "/register",
        name: "Register",
        component: require('./auth/Register.vue').default
    },
    {
        path: "/:pathMatch(.*)*",
        name: "PageNotFound",
        component: require('./views/PageNotFound.vue').default
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASH_URL),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active"
})

export default router;