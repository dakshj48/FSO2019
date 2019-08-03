import React, { useState, useEffect } from 'react'
import List from './List'
import Filter from './Filter'
import Form from './Form'
import Notification from './Notification'
import { getAll, create, deleteID, update } from './Server'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newTerm, setNewTerm] = useState('')
  const [ newMessage, setNewMessage] = useState([])
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        updatePerson(newName, newNumber)
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewMessage(
            [`Added ${newName}`, 'success']
          )
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNewMessage(
            [error.response.data.error, 'error']
          )
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
    }
  }
  const deletePerson = (name, id) => {
    const answer = window.confirm(`Delete ${name} ?`)
    if (answer) {
      deleteID(id)
        .then(response => {
          if(response.status !== 'error') {
            setPersons(persons.filter(person => person.id !== id))
          }
        })
    }
  }
  const updatePerson = (name, number) => {
    const ind = persons.findIndex(person => person.name === name)
    if (ind > -1) {
      update(persons[ind].id, {name: name, number: number})
        .then(response => {
          if(response.status === 200) {
            const ind = persons.findIndex(person => person.name === newName)
            const arr = persons
            arr[ind] = {...persons[ind], number: newNumber}
            setPersons(arr)
            setNewMessage(
              [`Updated the number for ${name}`, 'success']
            )
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          }
        })
        .catch(error => {
          if (error.response.data.error.includes('minimum length')) {
            setNewMessage(
              [error.response.data.error, 'error']
            )
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)  
          }
          else {
            setNewMessage(
              [`Information of ${name} has already been removed from server`, 'error']
            )
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
          }
        })
    }
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

  useEffect(() => {
    getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <Filter newTerm={newTerm} handleTermChange={handleTermChange} />
      <Form addPerson={addPerson} handleNameChange={handleNameChange} 
            handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <List people={persons} term={newTerm} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
