import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ newTerm, setNewTerm] = useState('')
  const handleTermChange = (event) => {
    setNewTerm(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const listHelper = (arr) => {
    const showCountry = (country) => () => setNewTerm(country.name)
    const languageList = (languages) => (
      languages.map(language => (
        <div key={language.name}>
          <li>{language.name}</li>
        </div>
      ))
    )
    if(arr.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
    else if(arr.length > 1) {
      return arr.map(country =>
        <div key={country.name}>
          {country.name} <button onClick={showCountry(country)}>show</button>
        </div>
       )
    }
    else if(arr.length === 1) {
      return(
        <div>
          {printer(arr[0], languageList)}
        </div>
      )
    }
  }

  const printer = (arr, languageList) => {
    return (
      <div>
        <h1>{arr.name}</h1>
              <p>capital {arr.capital}</p>
              <p>population {arr.population}</p>
              <h2>languages</h2>
              <ul>
                {languageList(arr.languages)}
              </ul>
              <img src={arr.flag} width='100' height='100' alt='country flag' />
      </div>
    )
  }
  
  const list = () => {
    if(newTerm !== '') {
      const arr = countries.filter(country => country.name.toLowerCase().includes(newTerm.toLowerCase()))
      return listHelper(arr)
    }
    return listHelper(countries)
  }

  return (
    <div>
      <div>
        find countries <input value={newTerm} onChange={handleTermChange}/>
      </div>
      <div>{list()}</div>
    </div>
  )
}

export default App;
