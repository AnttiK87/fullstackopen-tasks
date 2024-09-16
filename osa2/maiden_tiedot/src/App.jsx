import { useState, useEffect } from 'react'
import countryService from './services/countries'
import { Header, SearchCountry, Countries, CountryDetails } from './components/UiComponents'

// App component for rendering the main structure of the application
const App = () => {
  //variables
  const header1 = 'Search countries to get information'
  const [searchInput, setSearchInput] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [selectedWeather, setSelectedWeather] = useState(null)
  const [loadingCountries, setLoadingCountries] = useState(true)
  const [loadingWeather, setLoadingWeather] = useState(false);


  //function for getting countries from server
  useEffect(() => {
    setLoadingCountries(true)
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
        setLoadingCountries(false)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
        setLoadingCountries(false)
      })
  }, [])

  // Filtering to show countries that start with search input
  const itemsToShow = showResults
  ? countries.filter(country => 
      country.name.common.toLowerCase().startsWith(searchInput.toLowerCase())
    )
  : countries

  // Function for handling search input and setting the filtered results
  function handleSearchChange(event) {
    //console.log(event.target.value)
    setSearchInput(event.target.value)
    setShowResults(true)
    setSelectedCountry(null)
  }

  // Function for fetching and displaying detailed information of the selected country
  const showOne = (select) => {
    const selectedCountry= select

    if (selectedCountry) {
        //console.log('Selected country is:', selectedCountry.name.common)
        //console.log('Lat and long:', selectedCountry.capitalInfo.latlng[0], selectedCountry.capitalInfo.latlng[1])

        weather(selectedCountry.capitalInfo.latlng[0], selectedCountry.capitalInfo.latlng[1])
        //console.log('weather values at App.jsx:', selectedWeather)

        countryService
            .getOne(selectedCountry.name.common)
            .then(selectedOne => {
                setSelectedCountry(selectedOne)
                //console.log('Selected country details at App.jsx:', selectedOne)
            })
            .catch(error => {
                console.error('Error fetching country details:', error)
            })
    } else {
        console.log('No country found matching the search input')
    }
  }

  //useEffect for determining if one country is selected or no results are found
  useEffect(() => {
    if (itemsToShow.length === 1 && selectedCountry === null) {
      showOne(itemsToShow[0])
    } else if (itemsToShow.length === 0) {
      setSelectedCountry(null)
    }
  }, [itemsToShow])

  // Function for fetching and displaying the weather data of the selected country's capital
  const weather = (lat, long) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    setLoadingWeather(true)
  
    countryService
      .getWeather(lat, long, api_key)
      .then(selectedWeather => {
        setSelectedWeather(selectedWeather)
        setLoadingWeather(false)
      })
      .catch(error => {
        console.error('Error fetching weather:', error)
        setLoadingWeather(false)
      })
  }

  return (
    <>
      <Header header={header1} />
      <SearchCountry 
        searchInput={searchInput} 
        handleSearchChange={handleSearchChange} 
      />
      {loadingCountries ? (
        <p>Loading...</p>
      ) : selectedCountry === null ? (
        <div>
          {itemsToShow.length === 0 ? (
            <p>No results found</p>
          ) : itemsToShow.length > 10 ? (
            <p>Too many results, please refine your search</p>
          ) : (
            <Countries countries={itemsToShow} showDetails={showOne}/>
          )}
        </div>
      ) : (
        <div>
          <CountryDetails country={selectedCountry} weather={selectedWeather} loadingWeather={loadingWeather} />
        </div>
      )}
    </>
  )
}

export default App