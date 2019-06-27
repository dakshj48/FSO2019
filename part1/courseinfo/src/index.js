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
  let arr = props.parts
  return (
    <div>
      <Part info={{name: arr[0].name, number: arr[0].exercises}} />
      <Part info={{name: arr[1].name, number: arr[1].exercises}} />
      <Part info={{name: arr[2].name, number: arr[2].exercises}} />
    </div>
  )
}

const Total = (props) => {
  let arr = props.parts
  return (
    <div>
      <p>
        Number of exercises {arr[0].exercises + arr[1].exercises + arr[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
