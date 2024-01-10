import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

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
        setSuccessMessage(
          `Added '${returnedPerson.name}'`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

      }
    }

    const removeContact = id => {
      const person = persons.find(n => n.id === id)
      const name = person.name
      console.log(`person id: ${id}, person name: ${name}`)

      if (confirm(`Delete ${name} ?`) === true) {
        personService
        .remove(id)
        .then(removedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setNotificationMessage({
              "text": `The person was already removed from server`,
              "type": "error"
          })
          setPersons(persons.filter(p => p.id !== id))
        })
      }
    }

    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
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
              removeContact={() => removeContact(person.id)}
            />
          )}
        </ul>
    </div>
  )
}

export default App