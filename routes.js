import Router from 'koa-router'
import home from './app/controllers/home'
import todos from './app/controllers/todos'

const router = new Router()

router.get('/', home.index)

router.post('/todos', todos.create)
router.get('/todos', todos.index)
router.put('/todos/:id', todos.update)
router.del('/todos/:id', todos.destroy)

export default router
