import clientPkg from '@prisma/client'

const prisma = new clientPkg.PrismaClient({
  log: ['query', 'info', 'warn'],
})

const data = [
  { title: 'Buy flat', completed: false, createdAt: new Date('2020-10-19') },
  { title: 'Meet Allie', completed: false, createdAt: new Date('2020-10-19') },
  { title: 'Sell Playstation 4', completed: true, createdAt: new Date('2020-10-18') },
  { title: 'Read DB Design', completed: true, createdAt: new Date('2020-10-18') },
  { title: 'Review nodejs frameworks', completed: true, createdAt: new Date('2020-10-18') },
  { title: 'Read about 3rd VueJS', completed: true, createdAt: new Date('2020-10-18') },
  { title: 'Buy new table', completed: true, createdAt: new Date('2020-10-17') },
  { title: 'Bye new 4k monitor', completed: true, createdAt: new Date('2020-10-17') }
]

const main = async () => {
  const operations = data.map(record => prisma.todo.create({data: record}))
  await Promise.all(operations)
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
