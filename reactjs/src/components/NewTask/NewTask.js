import { Component } from 'react'

import './NewTask.scss'

class NewTask extends Component {
  constructor() {
    super()

    this.state = {
      color: "red"
    }
  }

  onClickEnter (e) {
    console.debug(e.key)
  }

  render () {
    return (
      <input type="text" className="new-task" placeholder="New Task" onKeyPress={this.onClickEnter} />
    )
  }
}

export default NewTask
