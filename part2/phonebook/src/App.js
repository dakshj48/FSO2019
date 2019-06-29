import React, { useState } from 'react'
import List from './List'
import Filter from './Filter'
import Form from './Form'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newTerm, setNewTerm] = useState('')
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName))
      window.alert(`${newName} is already added to phonebook`)
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleTermChange = (event) => {
    setNewTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newTerm={newTerm} handleTermChange={handleTermChange} />
      <Form addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <List people={persons} term={newTerm} />
    </div>
  )
}

export default App
