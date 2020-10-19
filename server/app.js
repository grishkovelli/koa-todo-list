import Koa from 'koa'
import Logger from 'koa-logger'
import views from 'koa-views'
import bodyParser from 'koa-bodyparser'
import routes from './routes'
import path from 'path'
import cors from '@koa/cors'

const app = new Koa()
const render = views(`${path.resolve()}/app/views`, { extension: 'pug' })

app
  .use(cors())
  .use(Logger())
  .use(bodyParser())
  .use(render)
  .use(routes.routes())
  .use(routes.allowedMethods())

export default app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
