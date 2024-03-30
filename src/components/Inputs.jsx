import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'

export default function Inputs() {
  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input placeholder='Search for city...' type="text" className='text-xl font-light p-2 outline-none w-full shadow-xl capitalize placeholder:lowercase' />
        <UilSearch size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' />
        <UilLocationPoint size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' />
      </div>
      
      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button name='metric' className='text-xl text-white font-light'>°C</button>
        <p className='text-xl text-white mx-1 font-thin'>|</p>
        <button name='imperial' className='text-xl text-white font-light'>°F</button>
      </div>
    </div>
  )
}
