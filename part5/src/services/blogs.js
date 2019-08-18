import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let user = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const setUser = newUser => {
  user = newUser
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token, User: user },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token, User: user },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.status
}

export default { setToken, setUser, getAll, create, update, deleteBlog }
