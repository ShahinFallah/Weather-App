import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TemperatureAndDetails from './components/TemperatureAndDetails'
import { getFormattedWeatherData } from './services/weatherService'
import { useEffect, useReducer } from 'react'
import { ACTIONS } from './action/ACTIONS'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForecastList from './components/ForecastList'
import loadingStyle from './utils/loading.module.css'

export default function App() {

  // Reducer function to manage state updates based on dispatched actions
  const reducer = (state, { type, data }) => {
    switch (type) {
      // Update the path in state based on the dispatched action type 'query'
      case 'query':
        return { ...state, path: data.path }
      // Update the unitGroup in state based on the dispatched action type 'units'
      case 'units':
        return { ...state, unitGroup: { unitGroup: data } }
      // Update the weather data in state based on the dispatched action type 'weather'
      case 'weather':
        return { ...state, weather: data }
    }
  }

  // Initialize state using useReducer hook, providing the reducer function and initial state
  const [state, dispatch] = useReducer(reducer, {
    path: 'canada', // Default path
    unitGroup: { unitGroup: 'metric' }, // Default unit group
    weather: null // Default weather data
  })

  // useEffect hook to fetch weather data when state.path or state.unitGroup changes
  useEffect(() => {
    // Function to fetch weather data from the API and dispatch the 'weather' action to update state
    const fetchWeather = async () => {
      // Determine the location for which weather is being fetched
      const message = state.path ? state.path : 'current location'

      // Display a toast message indicating that weather data is being fetched
      toast.info('fetching weather for ' + message)

      // Fetch formatted weather data using the current unit group and location path
      await getFormattedWeatherData({ ...state.unitGroup }, state.path)
        .then(data => {
          // Display a success toast message after successfully fetching weather data
          toast.success(`successfully fetched weather for ${data.country}`)
          // Dispatch the 'weather' action to update state with the fetched weather data
          dispatch({ type: ACTIONS.WEATHER, data: data })
        })
    }

    // Call the fetchWeather function when state.path or state.unitGroup changes
    fetchWeather()
  }, [state.path, state.unitGroup])

  // Function to determine the background gradient based on weather data
  const formatBackground = () => {
    // If weather data is not available, return a default background gradient
    if (!state.weather) return 'from-cyan-700 to-blue-700'

    // Define threshold temperature based on the unit group (metric or imperial)
    const threshold = state.unitGroup === 'metric' ? 20 : 60

    // Determine the background gradient based on the current temperature compared to the threshold
    if (state.weather.temp <= threshold)
      return 'from-cyan-700 to-blue-700'
    else
      return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className='h-screen'>
      <div className={`flex justify-center bg-gradient-to-br overflow-x-auto h-full ${formatBackground()}`}>
        <div className={`w-full px-1 py-2 sm:shadow-lg sm:px-10 sm:max-w-[48rem] sm:h-fit ${formatBackground()}`} >
          <TopButtons dispatch={dispatch} />
          <Inputs dispatch={dispatch} unit={state.unitGroup.unitGroup} />

          {/* Render weather components if weather data is available */}
          {state.weather? (
            <>
              <TimeAndLocation weather={state.weather} />
              <TemperatureAndDetails weather={state.weather} />
              <ForecastList title='HOURLY FORECAST' data={state.weather.hourly} />
              <ForecastList title='DAILY FORECAST' data={state.weather.daily} />
            </>
          ) :
            <div className=' flex justify-center items-center h-96 sm:hidden'>
              <div className={loadingStyle.ldsRing}><div></div><div></div><div></div><div></div></div>
            </div>
          }
        </div>
        {/* Render toast notifications container */}
        <ToastContainer autoClose={2000} theme='colored' />
      </div>
    </div>
  )
}