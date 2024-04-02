import { DateTime } from "luxon"
import { toast } from "react-toastify"

const API_KEY = '136134799ca2b612007766928f4ec7aa'
const BASE_API = 'https://api.openweathermap.org/data/2.5'
const getWeatherData = searchParams => {
    const url = new URL(BASE_API + '/' + 'weather')
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })
    const data = fetch(url)
        .then(res => {
             return res.json()
        })

    return data
}

const formatCurrentData = (data) => {
    if (data.message) return toast.error(data.message)
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        timezone,
        wind: { speed }
    } = data

    const { main: details, icon } = weather[0]

    return ({
        lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, timezone, speed
    })
}

const getFormattedWeatherData = async searchParams => {
    const formattedCurrentData = await getWeatherData({ ...searchParams })
        .then(data => {
            return formatCurrentData(data)
        })
    return formattedCurrentData
}

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

const formatToLocalTime = (secs, zone, format = "cccc, dd, LLL, yyyy' | Local time: 'hh:mm a") => {
    if (isNaN(secs) || isNaN(zone)) return;
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format)
}

export { getFormattedWeatherData, iconUrlFromCode, formatToLocalTime }