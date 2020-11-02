import clientPkg from '@prisma/client'

const prisma = new clientPkg.PrismaClient({
  log: ['query', 'info', 'warn'],
})

const index = async (ctx, next) => {
  const groups = await prisma.group.findMany()
  ctx.body = groups
}

const create = async (ctx, next) => {
  const group = await prisma.group.create({
    data: ctx.request.body
  })
  ctx.body = group
}

const destroy = async (ctx, next) => {
  try {
    const groupId = parseInt(ctx.params.id)
    const deleteGroup = prisma.group.delete({
      where: { id: groupId }
    })
    const deleteTodos = prisma.todo.deleteMany({
      where: { groupId: groupId }
    })
    await prisma.$transaction([deleteGroup, deleteTodos])
    ctx.status = 204
  } catch (err) {
    console.debug(err)
    ctx.status = 422
  }
}

export default {
  index,
  create,
  destroy
}
