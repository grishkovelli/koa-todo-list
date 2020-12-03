export default class {
  static apiUrl = 'http://localhost:5000'
  static headers = {
    'Content-Type': 'application/json'
  }

  static get (path) {
    return fetch(`${this.apiUrl}/${path}`, {
      method: 'get',
      headers: this.headers
    })
  }

  static post (path, payload) {
    return fetch(`${this.apiUrl}/${path}`, {
      method: 'post',
      headers: this.headers,
      body: payload
    })
  }

  static delete (path) {
    return fetch(`${this.apiUrl}/${path}`, {
      method: 'delete',
      headers: this.headers
    })
  }

  static put (path, payload) {
    return fetch(`${this.apiUrl}/${path}`, {
      method: 'put',
      headers: this.headers,
      body: payload
    })
  }
}
