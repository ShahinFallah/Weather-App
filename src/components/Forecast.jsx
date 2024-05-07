
function Forecast({forecastData}) {
    return (
        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>{forecastData.title}</p>
            <img
                className="size-12 my-1"
                src={forecastData.icon}
            />
            <p className='font-medium'>{Math.round(forecastData.temp)}°</p>
        </div>
    )
}

export default Forecast