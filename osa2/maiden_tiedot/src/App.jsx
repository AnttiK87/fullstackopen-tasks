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
  const [tooManyResults, setTooManyResults] = useState(false)
  const [selectedWeather, setSelectedWeather] = useState(null)


  //function for getting persons from server
  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
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
    console.log(event.target.value)
    setSearchInput(event.target.value)
    setShowResults(true)
    setSelectedCountry(null)
  }

  const showOne = (select) => {
    let selectedCountry;

    // Jos select-parametri ei ole null, käytetään sitä, muuten filteröidään hakutuloksen perusteella
    if (select) {
        selectedCountry = select;
    } else {
        selectedCountry = countries.filter(country =>
            country.name.common.toLowerCase().startsWith(searchInput.toLowerCase())
        )[0]; // Otetaan ensimmäinen alkio taulukosta
    }

    if (selectedCountry) {
        console.log('Selected country is:', selectedCountry.name.common);
        console.log('Lat and long:', selectedCountry.latlng[0], selectedCountry.latlng[1]);

        // Kutsu weather-funktiota ennen countryService-kutsua
        weather(selectedCountry.latlng[0], selectedCountry.latlng[1]);
        console.log('weather:', selectedWeather);

        // Hae tarkemmat tiedot valitusta maasta
        countryService
            .getOne(selectedCountry.name.common)
            .then(selectedOne => {
                setSelectedCountry(selectedOne);  // Päivitetään 'selectedCountry' yhdellä maalla
                console.log('Selected country details:', selectedOne);
            })
            .catch(error => {
                console.error('Error fetching country details:', error);
            });
    } else {
        console.log('No country found matching the search input');
    }
};

  
  useEffect(() => {
    if (itemsToShow.length > 10) {
      setTooManyResults(true);
    } else if (itemsToShow.length === 1 && selectedCountry === null) {
      showOne(null); // Kutsu showOne-funktiota, kun tulosten määrä on 1
    } else if (itemsToShow.length === 0) {
      setSelectedCountry(null)
      setTooManyResults(true);
    }else {
      setTooManyResults(false);
    }
  }, [itemsToShow]);  // Tarkkaile 'itemsToShow'-tilaa

  const weather = (lat, long) => {
    const api_key = import.meta.env.VITE_SOME_KEY;

    countryService
      .getWeather(lat, long, api_key)
          .then(selectedWeather => {
              setSelectedWeather(selectedWeather);
              console.log('Weather data:', selectedWeather);
          })
          .catch(error => {
              console.error('Error fetching weather:', error);
          });
  };

  return (
    <div>
      <Header header={header1} />
      <SearchCountry 
        searchInput={searchInput} 
        handleSearchChange={handleSearchChange} 
      />
  
      <div>
        {/* Ensimmäinen osio - Listataan maat */}
        {selectedCountry === null ? (
          <div>
          {tooManyResults && itemsToShow.length === 0 ? (
            <p>No results found</p>
          ) : tooManyResults ? (
            <p>Too many results, please refine your search</p>
          ) : (
            <Countries countries={itemsToShow} showDetails={showOne}/>
          )}
        </div>
        ) : (
          /* Toinen osio - Näytetään yksityiskohdat, jos vain yksi maa */
          <div>
            <CountryDetails country={selectedCountry} weather={selectedWeather} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App