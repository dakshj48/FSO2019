import React from 'react'

const User = ({ user }) => {
  if(user === undefined)
    return null
  return (
    <div>
      <h1>
        {user.name}
      </h1>
      <b>added blogs</b> <br />
      <ul style={{ listStyleType: 'circle' }}>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User
