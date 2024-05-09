import { formatToLocalTime } from "../services/weatherService"

export default function TimeAndLocation({weather: {dt, timezone, country}}) {
  return (
    <>
      <div className="flex items-center justify-center my-6">
        <p className="text-slate-300 text-lg w-72 font-extralight xs:w-auto text-center sm:text-xl">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-4xl font-medium sm:text-3xl">
          {country}
        </p>
      </div>
    </>
  )
}
