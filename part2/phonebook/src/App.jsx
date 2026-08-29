import { useState } from 'react'

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
        <div key={person.name}>{person.name} - {person.number}</div>
      )}</>
  )

}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '123456789'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')



  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert('user already exists in the phonebook')
      return
    }
    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
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
      <Persons personstoshow={personsToShow} />
    </div>
  )
}

export default App