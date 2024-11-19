<template>
    <li>
      {{ todo }}
      <button @click="remove">删除</button>
    </li>
  </template>
  
  <script>
  export default {
    name: 'TodoItem',
    props: {
      todo: String,
      index: Number
    },
    methods: {
      // 触发删除事件
      remove() {
        this.$emit('remove', this.index)
      }
    }
  }
  </script>