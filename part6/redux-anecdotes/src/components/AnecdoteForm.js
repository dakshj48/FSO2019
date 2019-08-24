import React from 'react'
import { toAdd } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {
  const handleAdd = event => {
    event.preventDefault()
    const anec = event.target.anec.value
    event.target.anec.value = ''
    props.toAdd(anec)
    props.setNotification(`added '${anec}'`, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div><input name='anec' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  toAdd,
  setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
