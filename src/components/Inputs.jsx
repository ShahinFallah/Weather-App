import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { useState } from 'react'
import { ACTIONS } from '../action/ACTIONS'
import { toast } from 'react-toastify'

export default function Inputs({ dispatch, unit }) {

  const [city, setCity] = useState(null)

  const handleUnitsChange = e => {
    const selectedUnit = e.target.name;
    if (selectedUnit !== unit) dispatch({ type: ACTIONS.UNITS, data: e.target.name })
  }

  const handleSearchClick = () => {
    if (city !== '') dispatch({ type: ACTIONS.QUERY, data: { q: city } })
  }

  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      toast.success('location fetched')
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      return dispatch({ type: ACTIONS.QUERY, data: { query: null, lat: lat, lon: lon } })
    })
    toast.error('location not fetched')

  }

  return (
    <div className='flex flex-row justify-center my-8'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input onChange={e => setCity(e.target.value)} placeholder='Search for city...' type="text" className='my-4 rounded text-lg font-light py-1 px-5 outline-none w-full shadow-xl capitalize placeholder:lowercase' />
        <UilSearch onClick={handleSearchClick} size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' />
        <UilLocationPoint onClick={handleLocationClick} size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' />
      </div>

      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button onClick={handleUnitsChange} name='metric' className='text-xl text-white font-light transition ease-out hover:scale-110'>°C</button>
        <p className='text-xl text-white mx-1 font-thin'>|</p>
        <button onClick={handleUnitsChange} name='imperial' className='text-xl text-white font-light transition ease-out hover:scale-110'>°F</button>
      </div>
    </div>
  )
}
