// Import necessary icons and hooks from libraries
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { useState } from 'react'
import { ACTIONS } from '../action/ACTIONS'
import { toast } from 'react-toastify'

export default function Inputs({ dispatch, unit }) {
  // State to store the city entered by the user
  const [city, setCity] = useState(null)

  // Function to handle unit change based on user selection
  const handleUnitsChange = e => {
    const selectedUnit = e.target.name;
    // Dispatch the 'units' action to update state with the selected unit
    if (selectedUnit !== unit) dispatch({ type: ACTIONS.UNITS, data: e.target.name })
  }

  // Function to handle search button click
  const handleSearchClick = e => {
    e.preventDefault()
    
    // Dispatch the 'query' action to update state with the entered city for searching
    if (city) dispatch({ type: ACTIONS.QUERY, data: { path: city } })
  }

  // Function to handle location button click for fetching user's current location
  const handleLocationClick = () => {
    // Use geolocation API to fetch current location coordinates
    navigator.geolocation.getCurrentPosition((position) => {
      // Display success toast message after successfully fetching location
      toast.success('location fetched')
      // Extract latitude and longitude from the fetched position
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      // Dispatch the 'query' action to update state with the fetched location coordinates
      return dispatch({ type: ACTIONS.QUERY, data: { query: null, lat: lat, lon: lon } })
    })
    // Display error toast message if location fetching fails
    toast.error('location not fetched')
  }

  return (
    <div className='flex flex-row justify-center my-8'>
      <form onSubmit={handleSearchClick} className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input onChange={e => setCity(e.target.value)} placeholder='Search for city...' type="text" className='my-4 rounded text-lg font-light py-1 px-5 outline-none w-full shadow-xl capitalize placeholder:lowercase' />
        <button>
          <UilSearch size="22" className='text-white cursor-pointer transition ease-out hover:scale-125' />
        </button>
        <UilLocationPoint onClick={handleLocationClick} size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' />
      </form>

      {/* Buttons for changing temperature units */}
      <div className='flex flex-row w-1/4 items-center justify-center'>
        {/* Button to switch to metric units (°C) */}
        <button onClick={handleUnitsChange} name='metric' className='text-xl text-white font-light transition ease-out hover:scale-110'>°C</button>
        <p className='text-xl text-white mx-1 font-thin'>|</p>
        {/* Button to switch to imperial units (°F) */}
        <button onClick={handleUnitsChange} name='us' className='text-xl text-white font-light transition ease-out hover:scale-110'>°F</button>
      </div>
    </div>
  )
}
