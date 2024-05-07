import React from 'react'
import Forecast from './Forecast'

export default function ForecastList({title, data}) {
    return (
        <>
            <div className='flex items-center justify-start mt-6'>
                <p className='text-white font-medium uppercase'>{title}</p>
            </div>
            <hr className='my-2' />

            <div className='flex flex-row items-center justify-between text-white'>
                {
                    data.map((forecastData, index) => (
                        <Forecast key={index} forecastData={forecastData} />
                    ))
                }
            </div>
        </>
    )
}
