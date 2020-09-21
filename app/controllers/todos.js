import clientPkg from '@prisma/client'

const prisma = new clientPkg.PrismaClient({
  log: ['query', 'info', 'warn'],
})

const index = async (ctx, next) => {
  const todos = await prisma.todo.findMany()
  ctx.body = todos
}

const create = async (ctx, next) => {
  const todo = await prisma.todo.create({data: ctx.request.body})
  ctx.body = todo
}

const update = async (ctx, next) => {
  const todo = await prisma.todo.update({
    where: { id: parseInt(ctx.body.id) },
    data: { complete: ctx.body.complete }
  })

  ctx.body = todo
}

const destroy = async (ctx, next) => {
  try {
    await prisma.todo.delete({
      where: { id: parseInt(ctx.params.id) }
    })
    ctx.status = 204
  } catch {
    ctx.status = 422
  }
}

export default {
  index,
  create,
  update,
  destroy
}
