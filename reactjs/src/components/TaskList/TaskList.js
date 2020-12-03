import { Component } from 'react'

import Task from '../Task'
import './TaskList.scss'

class TaskList extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { title: 'Create simple ReactJs App', completed: true },
        { title: 'Buy car', completed: false },
        { title: 'Read book', completed: false }
      ]
    }
  }

  render () {
    return (
      <div className="task-list">
        {this.state.tasks.map((task, index) =>
            <Task {...task} key={index} />
          )}
      </div>
    )
  }
}

export default TaskList
