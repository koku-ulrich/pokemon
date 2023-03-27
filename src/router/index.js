import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)
const routes = [
    {path: '/',name:'home', component: ()=> import("@/view/Home.vue")},
    {path: '/pokemon',name:'home', component: ()=> import("@/view/Home.vue")},
    {path: '/pokemon/:id', component: ()=> import("@/view/Detail.vue")},
    {path: '/404', component: ()=> import("@/view/PageNotFound.vue")},
    {path: '/:catchAll(.*)', redirect: '/404'}
]

const router = new VueRouter({
    // Provide the history implementation to use. you can also use hash
    mode: 'history',
    routes, // short for `routes: routes`
})

export default router