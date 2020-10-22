<template>
  <div class="app">
    <groups/> <todo-list />
  </div>
</template>

<script>
import Groups from './components/Groups.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    Groups,
    TodoList
  }
}
</script>
<style lang="scss" scoped>

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  display: flex;
  border: 1px solid #ccc;
  width: 420px;
  margin: 0 auto;
}
</style>
