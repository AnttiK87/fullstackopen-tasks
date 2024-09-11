import { useState } from 'react'
import { Header, SearchPerson, Persons, NewPerson, ShowAlert } from './components/UiComponents'

// App component for rendering the main structure of the application
const App = (props) => {
  //variables
  const header1 = 'Phonebook'
  const header2 = 'Add a new'
  const header3 = 'Numbers'
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('Add new name')
  const [newNumber, setNewNumber] = useState('Add new number')
  const [searchInput, setSearchInput] = useState('')
  const [showAll, setShowAll] = useState(true)

//function for adding person to array
  const addPerson = (event) => {
    event.preventDefault()

    //check is inputted name in the phonebook 
    const findDublicate = persons.find(person => person.name === newName)
    //console.log('findDublicate gets this values', findDublicate)

    //if name is not in the phonebook add new person to array or else show alert
    if (!findDublicate){
      const personObject = {
        name: newName,
        number: newNumber
      }
    
      setPersons(persons.concat(personObject))
      setNewName('Add new name')
      setNewNumber('Add new number')
    }
    else{
      //show alert
      ShowAlert(newName)
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
      <Persons persons={itemsToShow} />
    </div>
  )

}

export default App