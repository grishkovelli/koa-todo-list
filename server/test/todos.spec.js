import server from '../app.js'
import request from 'supertest'

afterEach(() => server.close())

test('Getting the user info is null if the url is /auth/user/10', async () => {
  const response = await request(server).get('/todos')
  expect(response.body).toEqual({})
})
