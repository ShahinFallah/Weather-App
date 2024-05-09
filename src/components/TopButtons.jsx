import { ACTIONS } from "../action/ACTIONS"

export default function TopButtons({dispatch}) {

    const cities = [
        {
            id:1,
            title:'London'
        },
        {
            id:2,
            title:'Sydney'
        },
        {
            id:3,
            title:'Tokyo'
        },
        {
            id:4,
            title:'Toronto'
        },
        {
            id:5,
            title:'Paris'
        }
    ]

  return <div className="hidden items-center justify-around my-6  sm:flex">
    {cities.map(city => (
        <button onClick={() => {dispatch({type:ACTIONS.QUERY, data: {path:city.title}})}} key={city.id} className="text-white text-lg font-medium transition ease-out hover:scale-110">{city.title}</button>
    ))}
  </div>
}