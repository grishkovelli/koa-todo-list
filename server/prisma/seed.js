import clientPkg from '@prisma/client'

const prisma = new clientPkg.PrismaClient({
  log: ['query', 'info', 'warn'],
})

const todos = [
  { title: 'Buy flat', completed: false, color: 'red', createdAt: new Date('2020-10-19') },
  { title: 'Meet Allie', completed: false, color: 'blue', createdAt: new Date('2020-10-19') },
  { title: 'Sell Playstation 4', completed: true, color: 'green', createdAt: new Date('2020-10-18') },
  { title: 'Read DB Design', completed: true, color: 'gold', createdAt: new Date('2020-10-18') },
  { title: 'Review nodejs frameworks', completed: true, color: 'red', createdAt: new Date('2020-10-18') },
  { title: 'Read about 3rd VueJS', completed: true, color: 'blue', createdAt: new Date('2020-10-18') },
  { title: 'Buy new table', completed: true, color: 'green', createdAt: new Date('2020-10-17') },
  { title: 'Bye new 4k monitor', completed: true, color: 'gold', createdAt: new Date('2020-10-17') }
]

const groups = [
  { title: 'My todos' },
  { title: 'Office' },
  { title: 'Grocery' },
  { title: 'Party' }
]

const main = async () => {
  const todosOps = todos.map(record => prisma.todo.create({data: record}))
  const groupsOps = groups.map(record => prisma.group.create({data: record}))
  const promisList = todosOps.concat(groupsOps)
  await Promise.all(promisList)
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
