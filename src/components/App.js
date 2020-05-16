import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  state={
      pets: [],
      filters: {
        type: 'all'
      }
    }

  fetchPets = () => {
    let filterUrl = '/api/pets'
    let setType = this.state.filters.type

    if (setType !== 'all') {filterUrl = `/api/pets?type=${setType}`}
    fetch(filterUrl)
      .then(r => r.json())
      .then(petsArray => this.setState({pets: petsArray}))
  }

  handleTypeChange = (e) => {
    let {value} = e.target
    this.setState({
      filters: {
        type: value
      }
    })
  }

  handleAdopt = (adoptedPetId) => {
    let newPets = this.state.pets.map(pet => pet.id === adoptedPetId ? {...pet, isAdopted: true} : pet)
    this.setState({pets: newPets})
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
              <Filters 
                typeState={this.state.filters.type}
                onChangeType={this.handleTypeChange}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdopt}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
