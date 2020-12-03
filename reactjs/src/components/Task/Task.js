import { Component } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../../store'

import './Task.scss'

class Task extends Component {
  static contextType = Context

  toggleTask = id => e => {
    const [state, dispatch] = this.context
    dispatch({ type: 'toggleTask', payload: { id } })
  }

  render () {
    const { id, title, completed } = this.props
    return (
      <div className={`task ${completed ? 'task--completed' : ''}`} onClick={this.toggleTask(id)}>
        {title}
      </div>
    )
  }
}

Task.propTypes = {
  id        : PropTypes.number,
  title     : PropTypes.string,
  completed : PropTypes.bool
}

export default Task
