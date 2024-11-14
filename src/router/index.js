import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    routes:[
        {
            path:"/",
            name:"index",
            component:() => import('@/views/index'),
        },
        {
            path:"/login",
            name:"index",
            component:() => import('@/views/login'),
        }
    ]
})
export default router;