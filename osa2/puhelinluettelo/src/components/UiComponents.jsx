//Function for rendering header
const Header = (props) => {
  //console.log('Header gets these values', props)
  return (
      <h2>{props.header}</h2>
  )
}

//Function for rendering search input
const SearchPerson = ({searchInput, handleSearchChange}) => {
  return(
    <form>
      <div>
        Search: <input 
          value={searchInput} 
          onChange={handleSearchChange}
        />
      </div>
    </form>
  )
}

//Function for rendering persons to the list
const Persons = ({persons}) => {
  //console.log('Persons gets these values', persons)
  return(
    <ul>
      {persons.map(person => 
        <Person key={person.name} person={person} />
      )}
    </ul>
  )
}

//Function for rendering one person to the list
const Person = ({ person }) => {
  return (
    <li>Name: {person.name}, Number: {person.number}</li>
  )
}

//Function for rendering form for adding new persons to the list
const NewPerson = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input 
          value={newName} 
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input 
          value={newNumber} 
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

//alert for that the inputted name is already added to phonebook
const ShowAlert = (newName) => {
  alert(`${newName} is already added to phonebook`)
}

  
export { Header, SearchPerson, Persons, NewPerson, ShowAlert }