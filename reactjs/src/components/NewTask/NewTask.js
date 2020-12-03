import { Component } from 'react'
import { Context } from '../../store'

import './NewTask.scss'

class NewTask extends Component {
  static contextType = Context

  onClickEnter = (e) => {
    const [state, dispatch] = this.context

    if (e.key === 'Enter') {
      dispatch({
        type: 'addTask',
        payload: { title: e.target.value, completed: false }
      })
      e.target.value = null
    }
  }

  render () {
    return (
      <input type="text" className="new-task" placeholder="New Task" onKeyPress={this.onClickEnter} />
    )
  }
}

export default NewTask
