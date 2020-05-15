import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }



  handleChange = ({target : {value} }) => {
    
    
   this.setState({
       
     filters: {...this.state.filters, type:value}

   })

  }

   handlePets = () => {

    let endpoint = '/api/pets'

    if(this.state.filters.type !== 'all') {
      endpoint += `?type=${this.state.filters.type}`
    }

    fetch(endpoint)
    .then(r => r.json())
    .then(pets => this.setState({pets: pets}))


   }

   handleAdopt = (petId) => {
     const pets = this.state.pets.map(p => {
       return p.id === petId ? { ...p, isAdopted:true} : p;
     })
     this.setState({
       pets: pets
     })
   }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType = {this.handleChange} onFindPetsClick={this.handlePets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet= {this.handleAdopt}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
