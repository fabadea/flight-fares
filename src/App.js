import React, { Component } from 'react'
import Title from '../src/Components/Title'
import Form from '../src/Components/Form'
import Calculator from './Components/Calculator'

class App extends Component {
  state = {
    passengers: undefined,
    miles: undefined,
    departureCity: undefined,
    arrivalCity: undefined,
    error: undefined
  }

  // function trigered in Form.js file. used for collecting data and setState with it
  getPrice = e => {
    e.preventDefault()
    const passengers = e.target.elements.passengers.value
    const miles = e.target.elements.miles.value
    const departureCity = e.target.elements.departureCity.value.toUpperCase()
    const arrivalCity = e.target.elements.arrivalCity.value.toUpperCase()

    if (miles && arrivalCity && departureCity && passengers) {
      this.setState({
        passengers: passengers,
        miles: miles,
        arrivalCity: arrivalCity,
        departureCity: departureCity,
        error: undefined
      })
    } else {
      this.setState({
        passengers: undefined,
        miles: undefined,
        arrivalCity: undefined,
        departureCity: undefined,
        error: 'Please make sure to fill out all the required fields correctly'
      })
    }
  }

  render () {
    const { passengers, miles, departureCity, arrivalCity, error } = this.state
    return (
      <div>
        <div className='wrapper'>
          <div className='container'>
            <div className='col-xs-5 form-container'>
              <Title />
              <Form getPrice={this.getPrice} />
              <Calculator
                passengers={passengers}
                miles={miles}
                departureCity={departureCity}
                arrivalCity={arrivalCity}
                error={error}
              />
            </div>
            <div className='col-xs-7 title-container' />
          </div>
        </div>
      </div>
    )
  }
}

export default App
