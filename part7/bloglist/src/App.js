import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Users from './components/Users'
import blogService from './services/blogs'
import { setBlogs, setUser } from './reducers/appReducer'
import { Container } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route, Link, withRouter
} from 'react-router-dom'
import User from './components/User'
import { useState } from 'react'
import userService from './services/users'
import Blog from './components/Blog'
import { Menu, Button, Icon } from 'semantic-ui-react'

const AppNoHistory = (props) => {
  const store = props.store
  const [users, setUsers] = useState([])

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        initialBlogs.sort((a,b) => b.likes - a.likes)
        store.dispatch(setBlogs(initialBlogs))
      })
  }, [store])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      store.dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [store])

  useEffect(() => {
    userService
      .getUsers().then(resp =>
        setUsers(resp)
      )
  }, [setUsers])

  const removeReset = obj => (({ reset, ...others }) => ({ ...others }))(obj)

  const userById = (id) => {
    return users.find(user => user.id === id)
  }

  const blogById = (id) => {
    return store.getState().app.blogs.find(blog => blog.id === id)
  }

  const handleLogout = () => {
    props.history.push('/')
    window.localStorage.clear()
    store.dispatch(setUser(null))
  }

  return (
    // <Container style={{width: 'auto'}}>
      <div>
        {store.getState().app.user === null &&
          <Container style={{width: '90%', padding: '10px'}}>
            <Login store={store} removeReset={removeReset} />
          </Container>
        }
        {store.getState().app.user !== null && (
          <Router>
            <Menu inverted tabular style={{width: 'auto'}}>
              <Menu.Item link>
                <Link to='/'>
                  <h5>
                    Blogs
                  </h5>
                </Link>
              </Menu.Item>
              <Menu.Item link>
                <Link to='/users'>
                  <h5>
                    Users
                  </h5>
                </Link>
              </Menu.Item>
              {/* <Menu.Item position='right'>
                {store.getState().app.user.name} logged in {' '}
              </Menu.Item> */}
              <Menu.Item position='right' disabled >
                {/* <em> */}
                  {/* <em> 
                    {store.getState().app.user.name} logged in {' '} 
                  </em> */}
                  <Button animated size='tiny' fluid type='submit' onClick={() => handleLogout()}>
                    <Button.Content visible>logout</Button.Content>
                    <Button.Content hidden>
                      <Icon name='sign-out' />
                    </Button.Content>
                  </Button>
                {/* </em> */}
              </Menu.Item>
            </Menu>
            <Container style={{width: '95%'}}>
            <Route exact path='/' render={() =>
              <Blogs store={props.store} removeReset={removeReset} />
            } />
            <Route exact path="/users" render={() =>
              <Users users={users} setUsers={setUsers} store={props.store} removeReset={removeReset} />}
            />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={userById(match.params.id)} />
            } />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog store={props.store} blog={blogById(match.params.id)} removeReset={removeReset} />
            } />
            </Container>
          </Router>
        )}
      </div>
    // </Container>
  )
}

const App = withRouter(AppNoHistory)

export default App
