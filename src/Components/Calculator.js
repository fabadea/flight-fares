import React from 'react'

const Calculator = props => {
  const { miles, departureCity, arrivalCity, passengers, error } = props

  // calculate costs for taxi, car and flight
  const tarifs = {
    parkingFee: 3,
    carMileCost: 0.2,
    taxiMileCost: 0.4,
    flightMileCost: 0.1
  }
  const carRideCost = (
    Math.ceil(passengers / 4) *
    (tarifs.parkingFee + tarifs.carMileCost * miles * 2)
  ).toFixed(2)
  const taxiRideCost = (
    Math.ceil(passengers / 4) *
    (tarifs.taxiMileCost * miles * 2)
  ).toFixed(2)
  console.log(carRideCost)
  console.log(taxiRideCost)

  const flightPassengerCost = tarifs.flightMileCost * passengers

  // calculate flights route using dijkstra’s algorithm
  const flights = [
    'AB800',
    'BC900',
    'CD400',
    'DE400',
    'BF400',
    'CE300',
    'DE300',
    'EB600',
    'CE200',
    'DC700',
    'EB500',
    'FD200'
  ]

  // manipulate data in order to obtain an useful graph

  const basicGraph = []
  for (let i = 0; i < flights.length; i++) {
    basicGraph.push({
      start: flights[i].slice(0, 1),
      finish: flights[i].slice(1, 2),
      distance: +flights[i].slice(-3)
    })
  }

  // build an useful directed graph for Dijkstra’s Algorithm

  function readyGraph (paths) {
    const graph = {}
    for (let i in paths) {
      const path = paths[i]
      const start = path['start']
      const finish = path['finish']
      const distance = path['distance']
      if (typeof graph[start] === 'undefined') {
        graph[start] = {}
        graph[start][finish] = distance
      } else {
        graph[start][finish] = distance
      }
    }
    return graph
  }

  // graph is ready to use
  const graph = readyGraph(basicGraph)

  // Dijkstra’s Algorithm here, where s and f are start and finish
  function solve (graph, s, f) {
    const solutions = {}
    solutions[s] = []
    solutions[s].dist = 0
    while (true) {
      let parent = null
      let nearest = null
      let dist = Infinity
      for (let n in solutions) {
        if (!solutions[n]) continue
        const ndist = solutions[n].dist
        const adj = graph[n]
        for (let a in adj) {
          if (solutions[a]) continue
          const d = adj[a] + ndist
          if (d < dist) {
            parent = solutions[n]
            nearest = a
            dist = d
          }
        }
      }
      if (dist === Infinity) {
        break
      }
      solutions[nearest] = parent.concat(nearest)
      solutions[nearest].dist = dist
    }
    if (solutions[f] !== undefined) solutions[f].unshift(s)
    const finish = solutions[f]
    if (finish === undefined) {
      return 'No'
    } else {
      return {
        results: solutions,
        path: finish,
        distance: finish.dist
      }
    }
  }

  // Dijkstra’s Algorithm used for solving the flights short path challenge

  const outboundRoute = solve(graph, departureCity, arrivalCity)
  const inboundRoute = solve(graph, arrivalCity, departureCity)

  // change flights journey from ex:["F", "D", "E", "B"] to "FD-DE-EB"
  const courseToCLient = arr => {
    const newArr = []
    for (let i = 0; i < arr.length - 1; i++) {
      if (typeof arr[i] === 'string') newArr.push(arr[i] + arr[i + 1])
    }
    return newArr.join('-')
  }

  return (
    <div className='calculator__info'>
      {miles && departureCity && arrivalCity && passengers && (
        <div className='calculator__key'>
          <p className='calculator__key'>
            Vehicle:{' '}
            <span className='calculator__value'>
              {+carRideCost <= +taxiRideCost ? 'Car' : 'Taxi'}
            </span>
          </p>

          <p className='calculator__key'>
            vehicleReturnCost:{' '}
            <span className='calculator__value'>
              {+carRideCost <= +taxiRideCost
                ? '£ ' + carRideCost
                : '£ ' + taxiRideCost}
            </span>
          </p>

          <p className='calculator__key'>
            outboundFlightRoute:{' '}
            <span className='calculator__value'>
              {outboundRoute === 'No'
                ? outboundRoute + ' outbound flight'
                : courseToCLient(outboundRoute.path)}
            </span>
          </p>

          <p className='calculator__key'>
            outboundFlightCost:{' '}
            <span className='calculator__value'>
              {outboundRoute === 'No'
                ? '0'
                : '£ ' + outboundRoute.distance * flightPassengerCost}
            </span>
          </p>

          <p className='calculator__key'>
            inboundFlightRoute:{' '}
            <span className='calculator__value'>
              {inboundRoute === 'No'
                ? inboundRoute + ' inbound flight'
                : courseToCLient(inboundRoute.path)}
            </span>
          </p>

          <p className='calculator__key'>
            inboundFlightCost:{' '}
            <span className='calculator__value'>
              {inboundRoute === 'No'
                ? '0'
                : '£ ' + inboundRoute.distance * flightPassengerCost}
            </span>
          </p>
        </div>
      )}
      {error && <p className='calculator__error'>{error}</p>}
    </div>
  )
}

export default Calculator
