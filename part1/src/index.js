import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <p>
        <h1>{props.course}</h1>
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.info.name} {props.info.number}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part info={{name: props.arr.parts[0], number: props.arr.exercises[0]}} />
      <Part info={{name: props.arr.parts[1], number: props.arr.exercises[1]}} />
      <Part info={{name: props.arr.parts[2], number: props.arr.exercises[2]}} />
    </div>
  )
}

const Total = (props) => {
  let arr = props.arr.exercises
  return (
    <div>
		  <p>
		    Number of exercises {arr[0] + arr[1] + arr[2]}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  let content = {
      parts: [part1, part2, part3],
      exercises: [exercises1, exercises2, exercises3]
  }

  return (
    <div>
      <Header course={course} />
      <Content arr={content} />
			<Total arr={content} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
