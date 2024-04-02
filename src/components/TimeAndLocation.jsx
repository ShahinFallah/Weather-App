import { formatToLocalTime } from "../services/weatherService"

export default function TimeAndLocation({weather: {dt, timezone, name, country}}) {
  return (
    <>
      <div className="flex items-center justify-center my-6">
        <p className="text-slate-300 text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">
          {name}, {country}
        </p>
      </div>
    </>
  )
}
