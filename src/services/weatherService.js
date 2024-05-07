import { DateTime } from "luxon"
import { toast } from "react-toastify"

const API_KEY = 'ECNKC322KQ2HQRRXF6ABWSN42'
const BASE_API = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'
// Function to fetch weather data from a specific API endpoint
const getWeatherData = async (searchParams, path) => {
    try {
        const url = new URL(BASE_API + '/' + path)
        url.search = new URLSearchParams({ ...searchParams, key: API_KEY })
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        toast.error('country not found!')
        throw error
    }
}


// Function to format the current weather data
const formatCurrentData = (data) => {
    // Destructure necessary data fields from the API response
    const {
        latitude: lat,
        longitude: lon,
        days,
        address: country,
        timezone,
        description,
    } = data

    // Destructure data for the current day's weather
    const {
        temp,
        feelslike,
        tempmin,
        tempmax,
        humidity,
        datetimeEpoch: dt,
        sunriseEpoch: sunrise,
        sunsetEpoch: sunset,
        windspeed: speed,
        icon,
        hours
    } = days[0]

    // Format forecast data for daily and hourly forecasts
    const { daily, hourly } = getFormattedForecast(days, hours)

    return ({
        lat, lon, temp, feelslike, tempmin, tempmax, humidity, name, dt, country, sunrise, sunset, description, icon, timezone, speed, daily, hourly
    })
}

// Function to format the forecast data for daily and hourly forecasts
const getFormattedForecast = (days, hours) => {
    // Format daily forecast data for the next 5 days
    const formattedDays = days.slice(1, 6).map(day => ({
        title: formatToLocalTime(null, day.datetime, 'cccc'),
        icon: iconUrlFromCode(day.icon),
        temp: day.temp
    }));

    // Format hourly forecast data for the next 5 hours
    const formattedHorse = hours.slice(10, 15).map(hour => ({
        title: DateTime.fromFormat(hour.datetime, 'HH:mm:ss').toFormat('hh:mm a'),
        icon: iconUrlFromCode(hour.icon),
        temp: hour.temp
    }))

    return { daily: formattedDays, hourly: formattedHorse }
}

// Function to fetch the weather data from the API and format it
const getFormattedWeatherData = async (searchParams, path) => {
    const formattedCurrentData = await getWeatherData({ ...searchParams }, path)
        .then(data => {
            return formatCurrentData(data)
        })
    return formattedCurrentData
}

// Function to generate the URL for weather icon based on icon code
const iconUrlFromCode = (code) => {
    return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/${code}.svg`
}

// Function to format time to local time based on timezone
const formatToLocalTime = (secs, zone, format = "cccc, dd, LLL, yyyy' | Local time: 'hh:mm a") => {
    // If format is specified for full date and time, format it using Luxon library
    if (format === "cccc, dd, LLL, yyyy' | Local time: 'hh:mm a") {
        const localTime = DateTime.now().setZone(zone);
        const formattedTime = localTime.toFormat(format);
        return formattedTime;
    }
    // If format is specified for day of the week (cccc), format it using JavaScript Date object
    if (format === "cccc") {
        const date = new Date(zone);
        const dayName = date.toLocaleString('en-US', { weekday: 'short' });
        return dayName
    }
    // If format is not specified, use Luxon library to format time based on seconds and timezone
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format)
}

// Export all functions for use in other modules
export { getFormattedWeatherData, iconUrlFromCode, formatToLocalTime, getFormattedForecast }
