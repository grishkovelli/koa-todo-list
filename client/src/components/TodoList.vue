<template>
  <div class="todolist">
    <input
      class="todolist__field"
      v-model="newTask"
      placeholder="New task"
      @keyup.enter="addNewTask" />

    <br>

    <div class="tasks">
      <template v-for="(tasks, date) in filteredTasks" :key="date">
        <div class="tasks__date">{{date}}</div>
        <div
          class="tasks__item"
          :class="{completed: task.completed}"
          v-for="(task, index) in tasks"
          :key="index"
          @click="toggleTaskStatus(index)"
        >
          {{task.title}}
          <span class="close" @click="removeTask(index)"></span>
        </div>
      </template>
    </div>

    <br>

    <div class="filter">
      <div
        class="filter__btn"
        :class="{active: name === filter}"
        @click="filter = name"
        v-for="(name, index) in filters"
        :key="index">{{name}}</div>
    </div>
  </div>
</template>

<script>
  // import moment from 'moment'

  export default {
    name: 'TodoList',
    data () {
      return {
        newTask: null,
        filter: 'All',
        tasks: [
          { title: 'Meet George', completed: false, createdAt: '18-10-2020' },
          { title: 'Buy eggs', completed: false, createdAt: '18-10-2020' },
          { title: 'Read a book', completed: false, createdAt: '17-10-2020' },
          { title: 'Organize office', completed: true, createdAt: '19-10-2020' }
        ],
        filters: ['All', 'Active', 'Completed']
      }
    },
    methods: {
      addNewTask () {
        this.tasks.push({ title: this.newTask, completed: false })
        this.newTask = null
      },
      toggleTaskStatus (index) {
        this.tasks[index].completed = !this.tasks[index].completed
      },
      removeTask () {

      }
    },
    computed: {
      filteredTasks () {
        let tasks = this.tasks

        if (!tasks.length)
          return

        if (this.filter === 'Active') {
          tasks = this.tasks.filter(task => !task.completed)
        } else if (this.filter === 'Completed') {
          tasks = this.tasks.filter(task => task.completed)
        }

        tasks = tasks.reduce((acc, val) => {
          acc[val.createdAt] = acc[val.createdAt] || []
          acc[val.createdAt].push(val)
          return acc
        }, {})

        tasks = Object.keys(tasks).sort().reduce((acc, date) => {
          acc[date] = tasks[date]
          return acc
        }, {})

        return tasks
      }
    }
  }
</script>

<style lang="scss" scoped>
  .todolist {
    width: 320px;
    border: 1px solid #ccc;
    margin: 0 auto;
    padding: 24px;
    display: flex;
    flex-direction: column;

    &__field {
      padding: 12px 16px;
      font-size: 16px;

      &:focus {
        outline: none;
      }
    }
  }

  .tasks {

    &__date {
      text-align: left;
      font-size: 11px;
      opacity: 0.5;
      font-weight: 500;
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      text-align: left;
      margin-bottom: 5px;
      font-size: 16px;
      padding: 0 16px;
    }

    &__item.completed {
      opacity: 0.5;
      text-decoration: line-through;
    }
  }

  .filter {
    display: flex;
    justify-content: flex-end;

    &__btn {
      cursor: pointer;
      padding: 3px 8px;
      background-color: blue;
      opacity: 0.3;
      border-radius: 8px;
      color: #fff;
      font-size: 14px;

      &:not(:last-child) {
        margin-right: 8px;
      }
    }

    &__btn.active {
      opacity: 0.7;
    }
  }

  .close {
    &:after {
      display: inline-block;
      content: "\00d7";
    }
  }
</style>
