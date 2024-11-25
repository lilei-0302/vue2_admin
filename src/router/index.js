import Vue from "vue";
import VueRouter from "vue-router";
import Interface from "./interface";
import builtIn from "./builtIn";//内置内容
Vue.use(VueRouter);

// 涉及点
// new VueRouter({}) 是利用VueRouter()构造函数，里面是一个对象用于配置路由信息，在这里用new关键字是实例化这个路由对象 。（必须在vue的环境下使用）
// 花括号里面的配置（这里只说常用的属性 routes 配置）：
// routes：指创建vue-router路由实例的配置项。用来配置多个route路由对象，值是数组对象的形式

// 属性名	          值类型	                释义
// path	          string	                 配置路径（当url上有对应的路径就会显示对应视图）
// component         object	                 对应的视图即组件
// name	           string	                 命名此路由
// redirect	           string	                 用于重定向到某一路由上
// children	            Array< RouteConfig>	 嵌套路由（值与routes的值一样）
const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "首页",
            component: () => import('@/views/index'),
            children: [{ //嵌套路由Vue Router 允许你在一个路由中嵌套其他路由，这样可以实现多级路由。
                path: "/home",
                name: "home",
                meta: {
                    title: "首页",
                    requiresAuth: true
                },
                component: () => import('@/views/home'),// 路由懒加载  为了优化应用性能，Vue Router 支持懒加载路由组件。这样，只有当路由被访问时，相关的组件才会被加载。
            }, {
                path: "/ECharts/bar",
                name: "bar",
                meta: {
                    title: "柱状图",
                },
                component: () => import('@/views/ECharts/bar'),
            }, {
                path: "/ECharts/pie",
                name: "pie",
                meta: {
                    title: "饼图"
                },
                component: () => import('@/views/ECharts/pie'),
            }, {
                path: "/ECharts/line",
                name: "line",
                meta: {
                    title: "折线图"
                },
                component: () => import('@/views/ECharts/line'),
            }, ...Interface, ...builtIn],
        },
        {
            path: "/login",
            name: "login",
            meta: {
                title: "登录",
                requiresAuth: false
            },
            component: () => import('@/views/login'),
        },
        {
            path: "/404",
            name: "404",
            meta: {
                title: "404",
                requiresAuth: false
            },
            component: () => import('@/views/404'),
        },
    ]
})

function isUserLoggedIn() {
    if(localStorage.getItem('userToken') && localStorage.getItem('userToken')==true){
        return true
    }else{
        return false
    }
}
// // 全局守卫：所有路由跳转前触发
// 路由权限控制：
// 判断用户是否有访问某个页面的权限，如果没有，重定向到登录页面。
// router.beforeEach((to, from, next) => {
//   // to：目标路由对象
//   // from：当前路由对象
//   // next：执行下一步操作的函数
//   // 例如：判断是否需要登录
//   if (to.meta.requiresAuth && !isUserLoggedIn()) {
//     next('/login'); // 跳转到登录页
//   } else {
//     next();
//   }
// })

// 动态修改页面标题：
// 根据路由信息动态修改页面的标题。
// router.beforeEach((to, from, next) => {
//     if (to.meta.title) {
//       document.title = to.meta.title;
//     }
//     next();
//   });




export default router;