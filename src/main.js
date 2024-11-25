import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from "./router"
import './assets/styles/theme.scss'
import store from './store'


Vue.config.productionTip = false

Vue.use(ElementUI);

// 注册全局指令
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中时调用
  inserted(el) {
    // 让元素获取焦点
    el.focus()
  }
})

new Vue({
  router,
  store,
  template: '<input v-focus />', // 在模板中使用全局指令
  render: h => h(App),
}).$mount('#app');

