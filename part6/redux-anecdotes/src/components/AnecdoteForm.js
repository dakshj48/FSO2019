import React from 'react'
import { toAdd } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {
  const handleAdd = (event) => {
    event.preventDefault()
    store.dispatch(toAdd(event.target.anec.value))
    event.target.anec.value = ''
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

export default AnecdoteForm
