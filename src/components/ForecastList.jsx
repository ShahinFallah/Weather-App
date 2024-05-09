import { useRef } from 'react'
import Forecast from './Forecast'
import { UilAngleRight } from '@iconscout/react-unicons'
import { UilAngleLeft } from '@iconscout/react-unicons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ForecastList({ title, data }) {

    const swiperRef = useRef()

    return (
        <div className='relative'>
            <div className='flex items-center justify-start mt-6'>
                <p className='text-white font-medium uppercase'>{title}</p>
            </div>
            <hr className='my-2' />
            <div className='overflow-x-hidden'>
                <div className='flex flex-row items-center justify-between text-white min-w-[35rem] space-x-7 sm:space-x-0'>
                    <Swiper
                        modules={[A11y]}
                        spaceBetween={1}
                        slidesPerView={3}
                        breakpoints={{
                            640: {
                                slidesPerView:5,
                                spaceBetween:50
                            }
                        }}
                        onSwiper={(swiper) => swiperRef.current = swiper}
                    >
                        {
                            data.map((forecastData, index) => (
                                <SwiperSlide key={index}>
                                    <Forecast forecastData={forecastData} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <button onClick={() => swiperRef.current.slidePrev()}>
                    <UilAngleLeft className="absolute left-0 top-0 bottom-0 my-auto size-11 text-gray-500 cursor-pointer block sm:hidden z-50" />
                </button>
                <button onClick={() => swiperRef.current.slideNext()}>
                    <UilAngleRight className="absolute right-0 top-0 bottom-0 my-auto size-11 text-gray-500 cursor-pointer block sm:hidden z-50" />
                </button>
            </div>
        </div>
    )
}
