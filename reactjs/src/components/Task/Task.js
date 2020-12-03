import { Component } from 'react'
import PropTypes from 'prop-types'

import './Task.scss'

class Task extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="task">
        {this.props.title}
      </div>
    )
  }
}

Task.propTypes = {
  title     : PropTypes.string,
  completed : PropTypes.bool
}

export default Task
