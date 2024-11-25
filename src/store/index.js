import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义 Vuex 的 Store
export default new Vuex.Store({
  // state 是 Vuex 存储中包含的唯一数据源，它代表了应用的状态。
  // 所有需要共享的数据都存储在 state 中，组件通过 mapState 等方式来访问和更新这些数据。
  state: {
    todos: [],  // 保存所有的待办事项
    count: 5,
  },
  // getters 是用于访问 state 中数据的计算属性。
  // 它类似于 Vue 组件中的计算属性，但作用于整个 Vuex store。
  // 你可以在 getters 中做一些数据派发、计算或处理。
  getters: {
    // 获取所有待办事项
    allTodos: (state) => state.todos,
    // 获取待办事项数量
    todosCount: (state) => state.todos.length,
    doubleCount(state) {
      return state.count * 2;
    }
  },
  // mutations 用于 同步修改 state 的方法。
  // Vuex 中的 state 是响应式的，但只能通过 mutations 来改变 state，这样可以更容易地追踪数据的变化。
  // 在组件中，可以通过 commit 来触发 mutation。
  mutations: {
    // 添加一个待办事项
    ADD_TODO(state, todo) {
      state.todos.push(todo)
    },
    // 删除一个待办事项
    REMOVE_TODO(state, index) {
      state.todos.splice(index, 1)
    },
    // 清空所有待办事项
    CLEAR_TODOS(state) {
      state.todos = []
    },
    increment(state) {
      state.count++;
    },
    incrementBy(state, payload) {
      state.count += payload;
    },
  },
  // actions 用于 异步操作，比如发起请求或其他异步任务。
  // 与 mutations 的不同之处是，actions 可以包含异步操作，并且可以调用 mutations 来更新 state。
  // 可以通过 dispatch 调用 actions。
  actions: {
    // 异步添加待办事项
    async addTodoAsync({ commit }, todo) {
      setTimeout(() => {
        commit('ADD_TODO', todo)
      }, 1000)
    },
    // 异步删除待办事项
    async removeTodoAsync({ commit }, index) {
      setTimeout(() => {
        commit('REMOVE_TODO', index)
      }, 1000)
    },
    async incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
    incrementByAsync({ commit }, payload) {
      setTimeout(() => {
        commit('incrementBy', payload);
      }, 1000);
    }
  }
})
