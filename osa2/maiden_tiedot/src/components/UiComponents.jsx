//Function for rendering header
const Header = (props) => {
  //console.log('Header gets these values', props)
  return (
      <h2>{props.header}</h2>
  )
}
  
//Function for rendering search input
const SearchCountry = ({searchInput, handleSearchChange}) => {
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

//Function for rendering countries to the list
const Countries = ({ countries, showDetails }) => {
  //console.log('Countries gets these values', countries, showDetails)
  return(
    <ul>
      {countries.map(country => 
        <Country key={country.name.common} country={country} showDetails={showDetails}/>
      )}
    </ul>
  )
}

//Function for rendering single country/row and show-button to the list
const Country = ({ country, showDetails }) => {
  return (
    <li>
      {country.name.common} &nbsp;
      <button onClick={() => showDetails(country)}>{'Show'}</button> 
    </li>
  );
};

// Renders detailed information about a selected country, including its weather data
const CountryDetails = ({ country, weather, loadingWeather }) => {
  console.log('CountryDetails gets these values at UiComponents.jsx:', country)
  //console.log('Weather gets these values at UiComponents.jsx', weather)

  // Ensures that the weather data is available and in the correct format
  const icon = weather && weather.weather && weather.weather[0] ? weather.weather[0].icon : null
  const temp = weather && weather.main ? weather.main.temp : null

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area} km<sup>2</sup></div>
      <div>Population: {country.population}</div>
      <h3>{"Languages:"}</h3>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      <h2>{`Weather in ${country.capital}`}</h2>

      {loadingWeather ? (
        <p>Loading weather data...</p>
      ) : weather && weather.weather ? (
        <div>
          <div>Temperature: {temp} &deg;C</div>
          {icon && (
            <img 
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
              alt={`weather img`} 
              width="150" 
            />
          )}
          <div>Wind: {weather.wind.speed} m/s</div>
        </div>
      ) : (
        <p>Weather data not available</p>
      )}
    </div>
  )
}


export { Header, SearchCountry, Countries, CountryDetails }