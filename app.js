import Koa from 'koa'
import Logger from 'koa-logger'
import views from 'koa-views'
import bodyParser from 'koa-bodyparser'
import routes from './routes'
import path from 'path'

const app = new Koa()
const render = views(`${path.resolve()}/app/views`, { extension: 'pug' })
const srcPort = 5000

app
  .use(Logger())
  .use(bodyParser())
  .use(render)
  .use(routes.routes())
  .use(routes.allowedMethods())
  .listen(srcPort, () => {
    console.log(`Server running on port ${srcPort}`)
  })
