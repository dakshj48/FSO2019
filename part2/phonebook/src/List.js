import React, { useState } from 'react'

const List = ({people, term}) => {
  const listHelper = (arr) => arr.map(person => 
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  )

  const list = () => {
    if(term !== '') {
      const arr = people.filter(person => person.name.toLowerCase().includes(term.toLowerCase()))
      return listHelper(arr)
    }
    else return listHelper(people)
  }

  return (
    <div>
      {list()}
    </div>
  )
}

export default List
