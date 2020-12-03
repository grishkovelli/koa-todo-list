import { Component } from 'react'
import Task from '../Task'
import { Context } from '../../store'
import './TaskList.scss'

class TaskList extends Component {
  static contextType = Context

  render () {
    const [state] = this.context

    return (
      <div className="task-list">
        {
          state.tasks.map(task => <Task {...task} key={task.id} />)
        }
      </div>
    )
  }
}

export default TaskList
