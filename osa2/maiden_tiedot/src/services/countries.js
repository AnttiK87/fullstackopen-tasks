import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getOne = (country) => {
    const request = axios.get(`${baseUrl}/name/${country}`)
    return request.then(response => response.data)
}

const getWeather = (lat, lon, apiKey) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}.00&lon=${lon}.00&appid=${apiKey}`
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching weather data:', error)
            throw error  // Heitetään virhe eteenpäin, jos tarvitaan
        });
}

export default { getAll, getOne, getWeather }