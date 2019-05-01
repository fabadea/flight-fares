import React from 'react'

// simple form in order to colect data from user

const Form = props => (
  <form onSubmit={props.getPrice}>
    <label>How many passengers are for this trip?</label>
    <br />
    <input type='text' name='passengers' placeholder='persons...' />
    <br />
    <label>How many miles are from home to airport?</label>
    <br />
    <input type='text' name='miles' placeholder='miles...' />
    <br />
    <label>From which city you need to take off</label>
    <br />
    <input type='text' name='departureCity' placeholder='from...' />
    <br />
    <label>In which city you need to land?</label>
    <br />
    <input type='text' name='arrivalCity' placeholder='to...' />
    <br />
    <button>Get Price</button>
  </form>
)

export default Form
