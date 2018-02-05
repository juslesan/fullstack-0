import React from 'react';
import Person from './components/Person';
import personService from './services/persons';
import Notification from './components/Notification';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null,
      showAll: true
    }
  }

  componentDidMount() {
    console.log('will mount')
    personService
      .getAll()
      .then(persons =>{
         this.setState({persons})
    })
  }

  addName = (event) => {
    event.preventDefault()
    for (var i = 0; i < this.state.persons.length; i++) {
      if (this.state.persons[i].name === this.state.newName) {
        if (window.confirm('Nimi on jo lisätty puhelinluetteloon, päivitetäänkö numero?')) {
          const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
          }
          personService
          .update(this.state.persons[i].id, personObject)
          .then(newPerson => {
              this.setState({
               newName: '',
               newNumber: '',
             })
             this.componentDidMount()
           })
          this.setState({
          error: `Numero Päivitetty`,
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)}
          else {
            this.setState({
              error: `Henkilö on jo lisätty palvelimelle`,
            })
            setTimeout(() => {
              this.setState({error: null})
            }, 5000)}
            this.setState({newNumber: '', newName: ''})
            return;
          }
        }
    
  
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    personService
    .create(personObject)
    .then(newPerson => {
      this.componentDidMount()
      
    }

    )
    this.setState({
      error: `Henkilö lisätty palvelimelle`, newName: '', newNumber: ''
    })
    setTimeout(() => {
      this.setState({error: null})
    }, 5000)}


  deletePerson = (id) => {

    return () => {
    personService
    .deleteId(id)
    .then(deletedPerson => {
      this.componentDidMount()
      this.setState({
        error: `Henkilö poistettu palvelimelta`,
      })
      setTimeout(() => {
        this.setState({error: null})
      }, 5000)
    }
    )
    .catch(error => {
      this.setState({
        error: `Henkilö on jo valitettavasti poistettu palvelimelta`,
      })
      setTimeout(() => {
        this.setState({error: null})
      }, 5000)
    }
  
    )}
  }

  
  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
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
    const personsToShow =
      this.state.showAll ?
        this.state.persons :
        this.state.persons.filter(person => person.name.includes(this.state.filter))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.error}/>

        <div>
        rajaa hakua <input
                    value ={this.state.filter}
                    onChange={this.handleFilterChange}
                    />
        </div>

        <h2>Lisää numero</h2>
        <form onSubmit={this.addName}>

          <div>
            nimi: <input  
                  value={this.state.newName} 

                  onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input 
                  value={this.state.newNumber} 

                  onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {personsToShow.map(person => <Person key={person.name} person={person} deletePerson={this.deletePerson(person.id)}/>)}
        </div>
    )
  }
}

export default App