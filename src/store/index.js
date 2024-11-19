import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义 Vuex 的 Store
export default new Vuex.Store({
  state: {
    todos: []  // 保存所有的待办事项
  },
  getters: {
    // 获取所有待办事项
    allTodos: (state) => state.todos,
    // 获取待办事项数量
    todosCount: (state) => state.todos.length
  },
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
    }
  },
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
    }
  }
})
