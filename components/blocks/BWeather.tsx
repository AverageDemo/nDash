import Image from 'next/image';
import type { WeatherObjectInterface } from 'interfaces/weather.interface';
import BCard from './BCard';

const convertTemperature = (tempInK: number, unit: number): string => {
  let temperature: number = 0;
  let unitSymbol: number = 8490;
  switch (unit) {
    case 0:
      // Celcius
      temperature = Math.round(tempInK - 273.15);
      unitSymbol = 8451;
      break;
    case 1:
      // Fahrenheit
      temperature = Math.round((tempInK - 273.15) * 1.8 + 32);
      unitSymbol = 8457;
      break;
    default:
      // Kelvin
      temperature = Math.round(tempInK);
      unitSymbol = 8490;
      break;
  }

  return `${temperature}${String.fromCharCode(unitSymbol)}`;
};

export default function BWeather({ weather }: Props) {
  const unit: number = Number(localStorage.getItem('unit')) ?? 2;

  const weatherImage: string = (weather?.current?.weather && weather.current.weather[0].icon) ?? '';

  const skyClarity: string =
    (weather?.current?.weather &&
      weather.current.weather[0].description
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')) ??
    '';

  return (
    <div className="">
      <BCard>
        <span className="flex w-full justify-between items-center">
          <div>
            {/* Icon & Current weather */}
            <div className="flex min-w-0 items-center justify-between">
              <Image
                width="200"
                height="200"
                alt="Weather Condition"
                src={`https://openweathermap.org/img/wn/${weatherImage}@2x.png`}
              />
              <dl className="text-sm font-medium whitespace-no-wrap">
                <dt className="sr-only">Temperature</dt>
                <dd className="text-gray-900 dark:text-gray-50 text-6xl font-light pb-2">
                  {weather.current?.main?.temp && convertTemperature(weather.current.main.temp, unit)}
                </dd>
                <dt className="sr-only">Cloudiness</dt>
                <dd>
                  <a className="text-blue-200 text-lg font-light">{skyClarity}</a>
                </dd>
              </dl>
              <div className="pl-24 pr-2">
                <dl className="text-sm font-medium whitespace-no-wrap pb-4">
                  <dd className="text-gray-900 dark:text-gray-50 text-xl font-light">Real Feel</dd>
                  <dd className="text-blue-200 text-2xl">
                    {weather.current?.main?.feels_like && convertTemperature(weather.current?.main?.feels_like, unit)}
                  </dd>
                </dl>
                <dl className="text-sm font-medium whitespace-no-wrap">
                  <dd className="text-gray-900 dark:text-gray-50 text-xl font-light">Today&apos;s Low</dd>
                  <dd className="text-blue-200 text-2xl">
                    {weather.current?.main?.feels_like && convertTemperature(weather.current?.main?.temp_min, unit)}
                  </dd>
                </dl>
              </div>
              <div className="px-24">
                <dl className="text-sm font-medium whitespace-no-wrap pb-4">
                  <dd className="text-gray-900 dark:text-gray-50 text-xl font-light">Humidity</dd>
                  <dd className="text-blue-200 text-2xl">{weather.current?.main?.humidity}%</dd>
                </dl>
                <dl className="text-sm font-medium whitespace-no-wrap">
                  <dd className="text-gray-900 dark:text-gray-50 text-xl font-light">Today&apos;s High</dd>
                  <dd className="text-blue-200 text-2xl">
                    {weather.current?.main?.feels_like && convertTemperature(weather.current?.main?.temp_max, unit)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          {/*  */}
          <div className=""></div>
        </span>
      </BCard>
    </div>
  );
}

type Props = {
  weather: WeatherObjectInterface;
};
