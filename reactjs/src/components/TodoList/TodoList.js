import NewTask from '../NewTask'
import TaskList from '../TaskList'
import { Store } from '../../store'
import './TodoList.scss'

function TodoList() {
  return (
    <div className="todo-list">
      <Store>
        <NewTask />
        <TaskList />
      </Store>
    </div>
  );
}

export default TodoList
