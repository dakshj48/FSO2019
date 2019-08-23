import React from 'react'
import { toAdd } from '../reducers/anecdoteReducer'
import { addNotification, remNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  const handleAdd = (event) => {
    const anec = event.target.anec.value
    event.preventDefault()
    props.toAdd(anec)
    event.target.anec.value = ''
    props.addNotification(`added '${anec}'`)
    setTimeout(() => {
      props.remNotification()
    }, 5000)
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
  addNotification,
  remNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
