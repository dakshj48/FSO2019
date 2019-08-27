const blogs = [
  {
    id: '1',
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 1,
    user: {
      _id: '123456',
      username: 'dj',
      name: 'dakshjain'
    }
  },
  {
    id: '2',
    title: 'title2',
    author: 'author2',
    url: 'url2',
    likes: 2,
    user: {
      _id: '123456',
      username: 'dj',
      name: 'dakshjain'
    }
  },
  {
    id: '3',
    title: 'title3',
    author: 'author3',
    url: 'url3',
    likes: 3,
    user: {
      _id: '123456',
      username: 'dj',
      name: 'dakshjain'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }
