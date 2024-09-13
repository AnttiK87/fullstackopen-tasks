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

//Function for rendering persons to the list
const Countries = ({ countries, showDetails }) => {
  //console.log('Persons gets these values', persons)
  return(
    <ul>
      {countries.map(country => 
        <Country key={country.name.common} country={country} showDetails={showDetails}/>
      )}
    </ul>
  )
}

const Country = ({ country, showDetails }) => {
  return (
    <li>
      {country.name.common} &nbsp;
      <button onClick={() => showDetails(country)}>{'Show'}</button>  {/* Välitetään koko 'country'-objekti */}
    </li>
  );
};

const CountryDetails = ({ country, weather }) => {
  console.log('CountryDetails gets these values', country);
  console.log('weather gets these values', weather);
  
  const languages = country.languages;
  // Tarkistetaan, onko weather määritelty ja onko siinä oikeat kentät
  const icon = weather && weather.weather && weather.weather[0] ? weather.weather[0].icon : null;
  const tempCelsius = weather && weather.main ? (weather.main.temp - 273.15).toFixed(2) : null;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <div>Population: {country.population}</div>
      <h3>{"Languages:"}</h3>
      <ul>
        {Object.entries(languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      <h2>{`Weather in ${country.capital}`}</h2>
      {/* Tarkista, että weather ja sen ominaisuudet ovat saatavilla */}
      {weather && weather.weather ? (
        <div>
          <div>Temperature: {tempCelsius} C</div>
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
  );
};


export { Header, SearchCountry, Countries, CountryDetails }