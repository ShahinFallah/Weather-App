import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset
} from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService'

export default function TemperatureAndDetails({ weather: { details, icon, temp, tempmin, tempmax, sunrise, sunset, speed, humidity, feelslike, timezone
} }) {
    return (
        <>
            <div className="flex items-center justify-center py-1 text-xl text-cyan-300 sm:py-3">
                <p>{details}</p>
            </div>

            <div className="flex flex-col items-center justify-between text-white py-3 mb-5 sm:flex-row">
                <img className="w-32 sm:w-24" src={iconUrlFromCode(icon)} />
                <p className="text-6xl my-8 ml-5 sm:my-0 sm:text-5xl sm:ml-12">{`${Math.round(temp)}°`}</p>
                <div className="flex flex-col space-y-3">
                    <div className="flex font-light text-2xl items-center justify-center mr-2.5 sm:text-sm">
                        <UilTemperature className='mr-1 size-6 sm:size-5' />
                        Real feel:
                        <span className='font-medium ml-1'>{`${feelslike}°`}</span>
                    </div>
                    <div className="flex font-light text-2xl items-center justify-center sm:text-sm">
                        <UilTear className='mr-1 size-6 sm:size-5' />
                        Humidity:
                        <span className='font-medium ml-1'>{`${Math.round(humidity)}%`}</span>
                    </div>
                    <div className="flex font-light text-2xl items-center justify-center sm:text-sm">
                        <UilWind className='mr-1 size-6 sm:size-5' />
                        Wind:
                        <span className='font-medium ml-1'>{`${Math.round(speed)} km/h`}</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center text-white text-lg py-3 my-6 sm:text-sm sm:flex-row sm:space-x-2'>
                <div className='flex mb-3 sm:mb-0'>
                    <UilSun />
                    <p className='font-light'>
                        Rise:
                        <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span>
                    </p>
                    <p className='font-light ml-3 mr-1'>|</p>
                    <UilSunset />
                    <p className='font-light'>
                        Set:
                        <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, 'hh:mm a')}</span>
                    </p>
                </div>

                <div className='flex'>
                    <p className='font-light hidden sm:block'>|</p>
                    <UilArrowUp />
                    <p className='font-light'>
                        High:
                        <span className='font-medium ml-1'>{`${Math.round(tempmax)}°`}</span>
                    </p>
                    <p className='font-light ml-3 mr-1'>|</p>
                    <UilArrowDown />
                    <p className='font-light'>
                        Low:
                        <span className='font-medium ml-1'>{`${Math.round(tempmin)}°`}</span>
                    </p>
                </div>
            </div>

        </>
    )
}
