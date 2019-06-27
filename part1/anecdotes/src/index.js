import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
      <>
        <button onClick={props.func}>{props.text}</button>
      </>
    )
}

const FlagAnec = (props) => {
  return (
    <div>
      {props.anecdotes[props.index]}
      <br></br>
      has {props.count[props.index]} votes
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [count, setCount] = useState(new Array(props.anecdotes.length).fill(0))

  const vote = (num) => {
    const copy = [...count]
    copy[num] += 1
    return () => setCount(copy)
  }

  const nextAnec = () => {
    let num = Math.floor(Math.random()*props.anecdotes.length)
    while (num === selected)
      num = Math.floor(Math.random()*props.anecdotes.length)
    return () => setSelected(num)  
  }

  const mostVoted = () => {
    let index = 0
    let mostCount = 0
    for(let i = 0; i < 6; i++) {
      if(count[i] > mostCount) {
        mostCount = count[i]
        index = i
      }      
    }
    return index 
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br></br>
      has {count[selected]} votes
      <br></br>
      <Button func={vote(selected)} text={'vote'} />
      <Button func={nextAnec()} text={'next anecdote'} />
      <h1>Anecdote with most votes</h1>
      <FlagAnec index={mostVoted()} anecdotes={anecdotes} count={count} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
