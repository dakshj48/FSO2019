import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  if (props.val === undefined)
    return (
      <>
        <td>{props.text}</td>
      </>
    )

  else if (props.text === 'positive')
    return (
      <>
        <td>{props.text}</td> 
        <td>{props.val} %</td>
      </>
    )

  return (
    <>
      <td>{props.text}</td>
      <td>{props.val}</td>
    </>
  )
}

const Statistics = (props) => {
  const [good, neutral, bad] = props.val
  const all = good + neutral + bad
  const average = () => ((1*good) + (-1*bad))/all

  if (all === 0)
    return (
      <table>
        <tbody>
          <tr><Statistic text='No feedback given' /></tr>
        </tbody>
      </table>
    )

  return (
    <table>
      <tbody>
        <tr><Statistic text='good' val={good} /></tr>
        <tr><Statistic text='neutral' val={neutral} /></tr>
        <tr><Statistic text='bad' val={bad} /></tr>
        <tr><Statistic text='all' val={all} /></tr>
        <tr><Statistic text='average' val={average()} /></tr>
        <tr><Statistic text='positive' val={good*100/all} /></tr>
      </tbody>
    </table>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.func}>{props.text}</button>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const updateCount = (str, count) => {
    if (str === 'good') {
      return () => setGood(count + 1)
    }
    else if (str === 'neutral') {
      return () => setNeutral(count + 1)
    }
    else {
      return () => setBad(count + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button func={updateCount('good', good)} text={'good'} />
      <Button func={updateCount('neutral', neutral)} text={'neutral'} />
      <Button func={updateCount('bad', bad)} text={'bad'} />
      <h1>statistics</h1>
      <Statistics val={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
