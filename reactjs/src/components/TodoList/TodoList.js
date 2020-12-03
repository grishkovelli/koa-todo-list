import NewTask from '../NewTask'
import TaskList from '../TaskList'
import './TodoList.scss'

function TodoList() {
  return (
    <div className="todo-list">
      <NewTask />
      <TaskList />
    </div>
  );
}

export default TodoList
