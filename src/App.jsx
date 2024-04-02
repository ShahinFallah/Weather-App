import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TemperatureAndDetails from './components/TemperatureAndDetails'
import { getFormattedWeatherData } from './services/weatherService'
import { useEffect, useReducer } from 'react'
import { ACTIONS } from './action/ACTIONS'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const reducer = (state, { type, data }) => {
    switch (type) {
      case 'query': return { ...state, query: { ...data } }
      case 'units': return { ...state, units: { units: data } }
      case 'weather': return { ...state, weather: data }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    query: { q: 'canada' },
    units: { units: 'metric' },
    weather: null
  })

  useEffect(() => {
    const fetchWeather = async () => {
      const message = state.query.q ? state.query.q : 'current location'

      toast.info('fetching weather for ' + message)
      await getFormattedWeatherData({ ...state.query, ...state.units })
        .then(data => {
          if(typeof data != 'object') return

          toast.success(`successfully fetched weather for ${data.name}`)
          dispatch({ type: ACTIONS.WEATHER, data: data })
        })
    }

    fetchWeather()
  }, [state.query, state.units])

  const formatBackground = () => {
    if (!state.weather) return 'from-cyan-700 to-blue-700'
    const threshold = state.units === 'metric' ? 20 : 60

    if (state.weather.temp <= threshold)
      return 'from-cyan-700 to-blue-700'
    else
      return 'from-yellow-700 to-orange-700'

  }

  return (
    <>
      <div className={`rounded mx-auto max-w-screen-md mt-4 py-5 px-20 bg-gradient-to-br ${formatBackground()} shadow-xl shadow-gray-400 `}>
        <TopButtons dispatch={dispatch} />
        <Inputs dispatch={dispatch} unit={state.units.units} />

        {state.weather && (
          <>
            <TimeAndLocation weather={state.weather} />
            <TemperatureAndDetails weather={state.weather} />
          </>
        )}
      </div>


      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}/>
    </>
  )
}
