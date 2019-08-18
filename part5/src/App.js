import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        initialBlogs.sort((a,b) => b.likes - a.likes)
        setBlogs(initialBlogs)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      blogService.setUser(user.username)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification(['wrong username or password', 'error'])
      setTimeout(() => {
        setNotification([])
      }, 5000)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({ "title": title, "author": author, "url": url })
      console.log(user.username, newBlog.user.username, newBlog)
      setBlogs(blogs.concat(newBlog))
      setNotification([`${title} by ${author} added`, 'success'])
      setTimeout(() => {
        setNotification([])
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch (error) {
      setNotification(['Failed to save the blog', 'error'])
      console.log('Failed to save the blog')
      setTimeout(() => {
        setNotification([])
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      {user === null && 
        <Login handleLogin={handleLogin} username={username} password={password} 
          setUsername={setUsername} setPassword={setPassword} notification={notification}
        />
      }
      {user !== null &&
        <Blog blogs={blogs} user={user} title={title} author={author} url={url}
          setBlogs={setBlogs} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} 
          handleLogout={handleLogout} handleNewBlog={handleNewBlog} notification={notification}
        />
      }
    </div>
  )
}

export default App;
