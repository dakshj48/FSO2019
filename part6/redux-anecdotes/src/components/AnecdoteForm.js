import React from 'react'
import { toAdd } from '../reducers/anecdoteReducer'
import { addNotification, remNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const handleAdd = async (event) => {
    event.preventDefault()
    const anec = event.target.anec.value
    event.target.anec.value = ''
    const newAnecdote = await anecdoteService.createNew(anec)
    props.toAdd(newAnecdote)
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
