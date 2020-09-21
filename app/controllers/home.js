const index = async (ctx, next) => {

  await ctx.render('home/index', {
    header: 'nodejs это кусок злоебучего асемблера блядь'
  })
}

export default {
  index
}
