import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

// Fetches a list of all countries
const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

// Fetches details of a specific country by name
const getOne = (country) => {
    const request = axios.get(`${baseUrl}/name/${country}`)
    return request.then(response => response.data)
}

// Fetches weather data from OpenWeatherMap API using lat/lon coordinates, with metric units
const getWeather = (lat, lon, apiKey) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    return axios.get(weatherUrl)
        .then(response => {
            //console.log('Weather data after query at countries.js:', response.data)
            return response.data
        })
        .catch(error => {
            console.error('Error fetching weather data:', error)
            throw error
        });
}

export default { getAll, getOne, getWeather }