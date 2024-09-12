import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import { Header, SearchPerson, Persons, NewPerson, ShowAlert } from './components/UiComponents'

// App component for rendering the main structure of the application
const App = () => {
  //variables
  const header1 = 'Phonebook'
  const header2 = 'Add a new'
  const header3 = 'Numbers'
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Add new name')
  const [newNumber, setNewNumber] = useState('Add new number')
  const [searchInput, setSearchInput] = useState('')
  const [showAll, setShowAll] = useState(true)

  //function for getting persons from server
  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //function for adding person to server
  const addPerson = (event) => {
    event.preventDefault()

    //check is inputted name in the phonebook 
    const findDublicate = persons.find(person => person.name === newName)
    //console.log('findDublicate gets this values', findDublicate)

    //if name is not in the phonebook add new person to server db.json file or show alert
    if (!findDublicate){
      const personObject = {
        name: newName,
        number: newNumber
      }

      phonebookService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('Add new name')
        setNewNumber('Add new number')
      })
    }
    else{
      //show alert and ask if user wants to change number for person already in phonebook
      if (window.confirm(`${findDublicate.name} is already added to this phonebook, replace the old number (${findDublicate.number}) with a new one (${newNumber})?`)) {
        changeNumber(findDublicate.id)
        setNewNumber('Add new number')
      }
    }
  }

  //function for deleting person from server/db.json file
  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error("Failed to delete person", error)
          alert(
            `${person.name} was already deleted from server`
          )
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  //filtering to show persons that starts with search input
  const itemsToShow = showAll
  ? persons
  : persons.filter(person => 
      person.name.toLowerCase().startsWith(searchInput.toLowerCase())
  )

  //function for setting state for new name
  function handleNameChange(event) {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  //function for setting state for new number
  function handleNumberChange(event) {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  //function for setting state for search/filtering results
  function handleSearchChange(event) {
    console.log(event.target.value)
    setSearchInput(event.target.value)
    setShowAll(false)
  }

  //function for changing phone number for existing person
  const changeNumber = id => {
    const person = persons.find(person => person.id === id)
    const changedNumber = { ...person, number: newNumber}

    phonebookService
      .update(id, changedNumber)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      .catch(error => {
        console.error("Failed to edit number", error)
        alert(
          `'${person.name}' was already deleted from server`
        )
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <Header header={header1} />
      <SearchPerson 
          searchInput={searchInput} 
          handleSearchChange={handleSearchChange} 
      />
      <Header header={header2} />
      <NewPerson 
          addPerson={addPerson} 
          newName={newName} 
          newNumber={newNumber} 
          handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange}
      />
      <Header header={header3} />
      <Persons persons={itemsToShow} deletePerson={deletePerson} />
    </div>
  )

}

export default App