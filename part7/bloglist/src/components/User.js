import React from 'react'
import { List } from 'semantic-ui-react'

const User = ({ user }) => {
  if(user === undefined)
    return null
  return (
    <div>
      <h2>
        User {user.name}
      </h2>
      <b style={{margin: 0}}>blogs added:</b> <br />
      <List bulleted>
        {user.blogs.map(blog => <List.Item key={blog.id}>{blog.title}</List.Item>)}
      </List>
    </div>
  )
}

export default User
