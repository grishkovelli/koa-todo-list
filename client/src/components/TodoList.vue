<template>
  <div class="todolist">
    <input
      class="todolist__field"
      v-model="newTask"
      placeholder="New task"
      @keyup.enter="createTask" />

    <div class="divider"></div>

    <div class="tasks">
      <template v-for="(tasks, date) in filteredTasks" :key="date">
        <div class="tasks__date">{{date}}</div>
        <div
          class="tasks__item"
          :class="{completed: task.completed}"
          v-for="task in tasks"
          :key="task.id"
          @click="toggleTaskStatus(task)"
        >
          {{task.title}}
          <drop-down>
            <div class="colors">
              <div
                class="colors__item"
                :class="`colors__item--${color}`"
                v-for="color in colors"
                :key="color"
                @click="colorTask(color, task)"></div>
            </div>
            <div class="separator"></div>
            <div class="remove" @click="removeTask(task.id)">Remove</div>
          </drop-down>

          <div class="tasks__color" :class="`tasks__color--${task.color}`"></div>
        </div>
      </template>
    </div>

    <div class="divider"></div>

    <div class="filter">
      <div
        class="filter__btn"
        :class="{active: name === filter}"
        @click="filter = name"
        v-for="(name, index) in filters"
        :key="index">{{name}} ({{counts[name]}})</div>
    </div>
  </div>
</template>

<script>
  import api from '../services/api.js'
  import moment from 'moment'
  import DropDown from './DropDown'

  export default {
    name: 'TodoList',
    data: () => ({
      newTask : null,
      filter  : 'All',
      tasks   : [],
      filters : ['All', 'Active', 'Completed'],
      colors  : ['none', 'red', 'blue', 'green', 'gold']
    }),
    components: {
      DropDown
    },
    created () {
      this.loadTasks()
    },
    mounted () {
    },
    methods: {
      async loadTasks () {
        const resp = await api.get('todos')

        if (resp.ok)
          this.tasks = await resp.json()
        else
          console.warn(resp.status)
      },
      async createTask () {
        const payload = { title: this.newTask }
        const resp = await api.post('todos', JSON.stringify(payload))

        if (resp.ok) {
          this.tasks.push(await resp.json())
          this.newTask = null
        } else {
          console.warn(resp.status)
        }
      },
      async toggleTaskStatus (task) {
        const payload = { completed: !task.completed }
        const resp = await api.put(`todos/${task.id}`, JSON.stringify(payload))

        if (resp.ok)
          task.completed = payload.completed
        else
          console.warn(resp.status)
      },
      async removeTask (id) {
        const resp = await api.delete(`todos/${id}`)

        if (resp.ok) {
          const taskIdx = this.tasks.findIndex(task => task.id === id)
          this.tasks.splice(taskIdx, 1)
        } else {
          console.warn(resp.status)
        }
      },
      async colorTask (color, task) {
        const payload = { color: color }
        const resp = await api.put(`todos/${task.id}`, JSON.stringify(payload))

        if (resp.ok)
          task.color = color
        else
          console.warn(resp.status)
      }
    },
    computed: {
      filteredTasks () {
        let tasks = this.tasks

        if (!tasks.length)
          return

        if (this.filter === 'Active') {
          tasks = this.activeTasks
        } else if (this.filter === 'Completed') {
          tasks = this.completedTasks
        }

        return tasks
          .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
          .reduce((acc, val) => {
            const formatedDate = moment(val.createdAt).format('ll')
            acc[formatedDate] = acc[formatedDate] || []
            acc[formatedDate].push(val)
            return acc
          }, {})
      },
      activeTasks () {
        return this.tasks.filter(task => !task.completed)
      },
      completedTasks () {
        return this.tasks.filter(task => task.completed)
      },
      counts () {
        return {
          All       : this.tasks.length,
          Active    : this.activeTasks.length,
          Completed : this.completedTasks.length
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .todolist {
    width: 300px;
    padding: 12px 24px 12px 24px;
    display: flex;
    flex-direction: column;

    &__field {
      padding: 12px 0;
      font-size: 14px;
      border-width: 0 0 1px 0;
      margin-bottom: 8px;

      &:focus {
        outline: none;
      }
    }
  }

  .tasks {
    height: 350px;
    overflow-y: auto;

    &__date {
      text-align: left;
      font-size: 11px;
      opacity: 0.5;
      font-weight: 500;
    }

    &__item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      text-align: left;
      margin-bottom: 5px;
      font-size: 16px;
      padding: 0 0 0 16px;
    }

    &__item.completed {
      opacity: 0.5;
      text-decoration: line-through;
    }

    &__color {
      position: absolute;
      left: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;

      &--red {
        background-color: red;
        border-color: red;
      }

      &--blue {
        background-color: blue;
        border-color: blue;
      }

      &--green {
        background-color: green;
        border-color: green;
      }

      &--gold {
        background-color: gold;
        border-color: gold;
      }
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
      font-size: 12px;

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

  .divider {
    margin-bottom: 8px;
  }

  .separator {
    width: 100%;
    height: 1px;
    background-color: gray;
    opacity: 0.3;
  }

  .colors {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 8px;

    &__item {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid #000;

      &--red {
        background-color: red;
        border-color: red;
      }

      &--blue {
        background-color: blue;
        border-color: blue;
      }

      &--green {
        background-color: green;
        border-color: green;
      }

      &--gold {
        background-color: gold;
        border-color: gold;
      }
    }
  }

  .remove {
    padding: 8px;
  }
</style>
