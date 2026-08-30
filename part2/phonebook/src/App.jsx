import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <>
      Filter: <input value={props.searchterm} onChange={props.handlesearchterm} />
    </>
  )
}

const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.addperson}>
        <div>
          name: <input value={props.newname} onChange={props.handlenamechange} />
          number: <input value={props.newnumber} onChange={props.handlenumberchange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )

}

const Persons = (props) => {
  return (
    <>
      {props.personstoshow.map(person =>
        <div key={person.name}>{person.name} - {person.number}
          <button onClick={() => props.deleteperson(person.id)}>
            delete
          </button>
        </div>

      )}</>
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (event) => {
    const personObject = {
      name: newName,
      number: newNumber
    }
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      const confirmed = window.confirm(`${existingPerson.name} is already added the phonebook, replace the old number with a new one`)
      if (!confirmed) {
        return
      }
      const updatedPersons = persons.map(person => {
        if (person.id === existingPerson.id) {
          return {
            ...person,
            number: newNumber
          }
        }
        return person
      })
      personService.update(existingPerson.id, {
        name: existingPerson.name,
        number: newNumber
      }).then(() => {
        setPersons(updatedPersons)
        setNewName('')
        setNewNumber('')
      })
      return
    }

    personService.create(personObject).then(returnedPerson => {
      setPersons([...persons, returnedPerson])
      setNewName('')
      setNewNumber('')

    })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const confirmed = window.confirm(`Delete ${person.name}?`)
    if (!confirmed) {
      return
    }
    personService.remove(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Filter: <input value={searchTerm} onChange={handleSearchTerm} /> */}
      <Filter searchterm={searchTerm}
        handlesearchterm={handleSearchTerm} />
      <PersonForm addperson={addPerson}
        newname={newName}
        newnumber={newNumber}
        handlenamechange={handleNameChange}
        handlenumberchange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personstoshow={personsToShow} deleteperson={deletePerson} />
    </div>
  )
}

export default App