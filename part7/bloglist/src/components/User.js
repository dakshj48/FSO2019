import React from 'react'
import { List } from 'semantic-ui-react'

const User = ({ user }) => {
  if(user === undefined)
    return null
  return (
    <div>
      <h1>
        {user.name}
      </h1>
      <b>added blogs</b> <br />
      <List bulleted>
        {user.blogs.map(blog => <List.Item key={blog.id}>{blog.title}</List.Item>)}
      </List>
    </div>
  )
}

export default User
