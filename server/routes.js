import Router from 'koa-router'
import home from './app/controllers/home'
import todos from './app/controllers/todos'
import groups from './app/controllers/groups'

const router = new Router()

router.get('/', home.index)

// TODOS
router.post('/todos', todos.create)
router.get('/todos', todos.index)
router.put('/todos/:id', todos.update)
router.del('/todos/:id', todos.destroy)

// GROUPS
router.post('/groups', groups.create)
router.get('/groups', groups.index)
router.del('/groups/:id', groups.destroy)

export default router
