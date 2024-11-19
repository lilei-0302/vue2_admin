<template>
    <div>
      <div>
        <input v-model="newTodo" placeholder="添加一条新的todo" @keyup.enter="addTodo" />
        <button @click="addTodo">添加Todo</button>
      </div>
  
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          <TodoItem :todo="todo" :index="index" @remove="removeTodo" />
        </li>
      </ul>
  
      <div v-if="todosCount > 0">
        <el-button @click="clearTodos">删除全部</el-button>
      </div>
    </div>
  </template>
  
  <script>
  import TodoItem from './TodoItem.vue'
  
  export default {
    name: 'TodoList',
    components: {
      TodoItem
    },
    data() {
      return {
        newTodo: ''  // 用于绑定输入框的待办事项内容
      }
    },
    computed: {
      // 获取所有待办事项
      todos() {
        return this.$store.getters.allTodos
      },
      // 获取待办事项数量
      todosCount() {
        return this.$store.getters.todosCount
      }
    },
    methods: {
      // 添加待办事项
      addTodo() {
        if (this.newTodo.trim() !== '') {
          this.$store.dispatch('addTodoAsync', this.newTodo.trim())
          this.newTodo = ''  // 添加后清空输入框
        }
      },
      // 删除待办事项
      removeTodo(index) {
        this.$store.dispatch('removeTodoAsync', index)
      },
      // 清空所有待办事项
      clearTodos() {
        this.$store.commit('CLEAR_TODOS')
      }
    },
    created(){

    },
    mounted(){
        console.log(this.$store);
        
    }
  }
  </script>
  