import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
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
  const arr = props.parts
  const parts = () => arr.map(part =>
    <Part info={{name: part.name, number: part.exercises}} key={part.id} />
  )

  return (
    <div>
      {parts()}
    </div>
  )
}

const Total = (props) => {
  const arr = props.parts
  const total = arr.reduce( (s, p) => s + p.exercises, 0 )

  return (
    <div>
      <strong>
        total of {total} exercises
      </strong>
    </div>
  )
}

const Course = (props) => {
  const course = props.course

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
