const Reducer = (state, action) => {
  switch (action.type) {
    case 'addTask':
      const taskIds = state.tasks.map(task => task.id)
      const nextId = Math.max(...taskIds) + 1
      const newTask = Object.assign({id: nextId}, action.payload)

      return {
        ...state,
        tasks: state.tasks.concat(newTask)
      }
    case 'toggleTask':
      const task = state.tasks.find(task => task.id === action.payload.id)
      task.completed = !task.completed
      return {
        ...state,
        tasks: state.tasks
      }
    default:
      return state
  }
}

export default Reducer
