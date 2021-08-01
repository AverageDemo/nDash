import Image from 'next/image';
import type { WeatherObjectInterface } from 'interfaces/weather.interface';
import BCard from './BCard';

const getClouds = (cloudPercentage: number): string => {
  let clouds: string = '';

  switch (true) {
    case cloudPercentage <= 10:
      clouds = 'Clear Sky';
      break;
    case cloudPercentage > 10 && cloudPercentage <= 40:
      clouds = 'Partly Cloudy';
      break;
    case cloudPercentage > 40 && cloudPercentage <= 70:
      clouds = 'Cloudy';
      break;
    case cloudPercentage > 70 && cloudPercentage <= 100:
      clouds = 'Very Cloudy';
      break;
    default:
      break;
  }
  return clouds;
};

const convertTemperature = (tempInK: number, unit: Unit): number => {
  let temperature: number = 0;
  switch (unit) {
    case 0:
      // Celcius
      temperature = Math.round(tempInK - 273.15);
      break;
    case 1:
      // Fahrenheit
      temperature = Math.round((tempInK - 273.15) * 1.8 + 32);
      break;
    default:
      // Kelvin
      temperature = Math.round(tempInK);
      break;
  }

  return temperature;
};

export default function BWeather({ weather }: Props) {
  const weatherImage: string = (weather?.current?.weather && weather.current.weather[0].icon) ?? '';

  return (
    <div className="">
      <BCard>
        <span className="flex w-full justify-between items-center">
          <span className="flex min-w-0 items-center justify-between">
            <Image
              width="200"
              height="200"
              alt="Weather Condition"
              src={`https://openweathermap.org/img/wn/${weatherImage}@2x.png`}
            />
            <dl className="text-sm font-medium whitespace-no-wrap">
              <dt className="sr-only">Temperature</dt>
              <dd className="text-gray-900 dark:text-gray-50 text-6xl font-light pb-2">
                {weather.current?.main?.temp && convertTemperature(weather.current.main.temp, Unit.FAHRENHEIT)}&deg;
              </dd>
              <dt className="sr-only">Cloudiness</dt>
              <dd>
                <a className="text-blue-200 text-lg font-light">
                  {weather.current?.clouds?.all && getClouds(weather.current.clouds.all)}
                </a>
              </dd>
            </dl>
          </span>
        </span>
      </BCard>
    </div>
  );
}

enum Unit {
  CELCIUS = 0,
  FAHRENHEIT = 1,
  KELVIN = 3,
}

type Props = {
  weather: WeatherObjectInterface;
};
