
function Forecast({forecastData}) {
    return (
        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-lg sm:text-sm'>{forecastData.title}</p>
            <img
                className="size-24 sm:size-12 sm:my-1"
                src={forecastData.icon}
            />
            <p className='font-medium text-lg sm:text-sm'>{Math.round(forecastData.temp)}°</p>
        </div>
    )
}

export default Forecast