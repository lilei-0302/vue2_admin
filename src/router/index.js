import Vue from "vue";
import VueRouter from "vue-router";
import Interface from "./interface";
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "首页",
            component: () => import('@/views/index'),
            children: [{
                path: "/home",
                name: "index",
                component: () => import('@/views/home'),
            }, {
                path: "/ECharts/bar",
                name: "柱状图",
                component: () => import('@/views/ECharts/bar'),
            }, {
                path: "/ECharts/pie",
                name: "饼图",
                component: () => import('@/views/ECharts/pie'),
            }, {
                path: "/ECharts/line",
                name: "折线图",
                component: () => import('@/views/ECharts/line'),
            },...Interface],
        },
        {
            path: "/login",
            name: "index",
            component: () => import('@/views/login'),
        },
    ]
})
export default router;