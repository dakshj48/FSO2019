import React from 'react'
import { toVote } from '../reducers/anecdoteReducer'
import { addNotification, remNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const vote = (id, content) => {
    props.toVote(id)
    props.addNotification(`you voted '${content}'`)
    setTimeout(() => {
      props.remNotification()
    }, 5000)
  } 

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter === '')
    return anecdotes.sort((a, b) => b.votes - a.votes)
  return anecdotes.filter(obj => obj.content.includes(filter)).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    visibleAnecdotes: anecdotesToShow(state),
    notification: state.notification,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  toVote,
  addNotification,
  remNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
