import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  
  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchName(event.target.value)
  }

  const personsToShow = searchName
    ? persons
    : persons.filter(person => person.name === searchName)


  const addContact = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }

      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

      }
    }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const removePerson = id => {

  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter 
          searchName={searchName} 
          handleSearch={handleSearch} 
          personsToShow={personsToShow} 
        />
      <h2>Add a new</h2>
        <PersonsForm 
          newName={newName} 
          newNumber={newNumber} 
          addContact={addContact} 
          handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <ul>
          {persons.map(person =>
            <Persons
              key={person.id}
              person={person}
            />
          )}
        </ul>
    </div>
  )
}

export default App