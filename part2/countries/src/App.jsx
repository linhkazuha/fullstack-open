import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API_KEY

function App() {
  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [weather, setWeather] = useState(null)

  const filteredCountries = searchCountry === ""
    ? []
    : countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

  const countryToShow = selectedCountry ? selectedCountry
      : selectedCountry === null && filteredCountries.length === 1
        ? filteredCountries[0] : null

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        console.log('countries:', response.data)
        setCountries(response.data)
      })
  }, [])



  useEffect(() => {
    if (countryToShow) {
      setWeather(null)
      axios
        .get(`https://api.openweathermap.org/geo/1.0/direct?q=${countryToShow.capital[0]}&limit=1&appid=${api_key}`)
        .then(response => {
          // console.log('geocoding:', response.data)
          setCoordinates(response.data[0])
        })
    }
  }, [countryToShow])

  useEffect(() => {
    if (coordinates) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [coordinates])

  const Country = ({ country, weather }) => {
    return (
      <>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <div>{Object.values(country.languages).map(language => (
          <div key={language}>- {language}</div>
        ))}</div>
        <img src={country.flags.png} />

        <h2>Weather in {country.capital[0]}</h2>
        
        <div>Temperature: {weather && weather.main.temp} Celsius</div>
        <div>Description: {weather && weather.weather[0].description}</div>
        {weather && (
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        )}
        {weather && (
          <div>Wind {weather.wind.speed} m/s</div>
        )}
      </>
    )
  }


  return (
    <>
      find countries <input
        value={searchCountry}
        onChange={(event) => {
          setSearchCountry(event.target.value)
          setSelectedCountry(null)
        }}
      />

      {filteredCountries.length > 10
        ? <div>Too many matches, specify another filter</div>
        : filteredCountries.length === 1
          ? <div>
            <Country weather={weather} country={filteredCountries[0]} />
          </div>
          : selectedCountry ? <Country weather={weather} country={selectedCountry}></Country>
            : filteredCountries.map(country => (
              <div key={country.cca3}>
                {country.name.common}
                <button onClick={() => setSelectedCountry(country)}>Show</button>
              </div>
            ))
      }
    </>
  )
}
export default App
