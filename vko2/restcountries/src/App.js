import React from 'react';
import Country from './components/country';
import countryService from './service/countries';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      showAll: true
    }
  }
  componentDidMount() {
    console.log('will mount')
    countryService
      .getAll()
      .then(countries =>{
         this.setState({countries})
    })
  }

  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
    console.log(this.state.filter)
    
    if (this.state.filter.length === 0) {
      this.setState({showAll: true})
    } else {
      this.setState({showAll: false})
    }
    console.log(this.state.showAll)
  }

  render() {
    const countriesToShow =
      this.state.showAll ?
        this.state.countries :
        this.state.countries.filter(country => country.name.includes(this.state.filter))
    if (countriesToShow.length > 10) {
      return (
        <div>
          <div>
            find countries: <input
                                value ={this.state.filter}
                                onChange={this.handleFilterChange}
                                 />
          </div>
          too many countries specify another filter
        </div>
      )
    }
    if (countriesToShow.length === 1) {
      return (
        <div>
          <div>
            find countries: <input
                                value ={this.state.filter}
                                onChange={this.handleFilterChange}
                                 />
          </div>
          <h2>{countriesToShow[0].name}</h2> 
          {countriesToShow[0].population} <br/><br/>
          {countriesToShow[0].capital} <br/>
          <img src ={countriesToShow[0].flag}></img>
        </div>
      )
    }

    return ( 
     <div>
        <div>

          find countries: <input
                    value ={this.state.filter}
                    onChange={this.handleFilterChange}
                    />
        </div>
        <div>
        {countriesToShow.map(country => <Country key={country.name} country={country} />)}

        </div>
      </div>
    )
  }
}
export default App;
