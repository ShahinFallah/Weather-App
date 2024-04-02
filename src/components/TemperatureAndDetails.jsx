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

export default function TemperatureAndDetails({weather:{details,icon,temp,temp_min,temp_max,sunrise,sunset,speed,humidity,feels_like, timezone
}}) {
    return (
        <>
            <div className="flex items-center justify-center py-3 text-xl text-cyan-300">
                <p>{details}</p>
            </div>

            <div className="flex flex-row items-center justify-between text-white py-3  mb-8">
                <img className="ml-5 w-25" src={iconUrlFromCode(icon)} />
                <p className="text-5xl ml-2.5">{`${Math.round(temp)}°`}</p>
                <div className="flex flex-col space-y-3">
                    <div className="flex font-light text-sm items-center justify-center mr-2.5">
                        <UilTemperature className='mr-1' size={18} />
                        Real feel:
                        <span className='font-medium ml-1'>{`${feels_like}°`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                        <UilTear className='mr-1' size={18} />
                        Humidity:
                        <span className='font-medium ml-1'>{`${Math.round(humidity)}%`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                        <UilWind className='mr-1' size={18} />
                        Wind:
                        <span className='font-medium ml-1'>{`${Math.round(speed)} km/h`}</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-row items-center justify-center space-x-3 text-white text-sm py-3 my-6'>
                <UilSun />
                <p className='font-light'>
                    Rise:
                    <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span>
                </p>
                <p className='font-light'>|</p>
                <UilSunset />
                <p className='font-light'>
                    Set:
                    <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, 'hh:mm a')}</span>
                </p>
                <p className='font-light'>|</p>
                <UilArrowUp />
                <p className='font-light'>
                    High:
                    <span className='font-medium ml-1'>{`${Math.round(temp_max)}°`}</span>
                </p>
                <p className='font-light'>|</p>
                <UilArrowDown />
                <p className='font-light'>
                    Low:
                    <span className='font-medium ml-1'>{`${Math.round(temp_min)}°`}</span>
                </p>
            </div>

        </>
    )
}
