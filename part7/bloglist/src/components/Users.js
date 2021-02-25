import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {

  return(
    <div>
      <h1>Users</h1>
      <Table striped celled unstackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <b>user</b>
            </Table.Cell>
            <Table.Cell>
              <b>blogs created</b>
            </Table.Cell>
          </Table.Row>
          {users.map(
            user => <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Users
