import Image from 'next/image';
import { useState, useEffect } from 'react';

import BCard from '@/blocks/BCard';
import { AppContextInterface } from '@/context/AppContext';
import type { CurrentWeatherInterface, WeatherObjectInterface } from '@/interfaces/weather.interface';

const apiUrl = (lat: string, lon: string, apiKey: string, oneCall: boolean = false) => {
  // Change API here if need be
  if (oneCall)
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current&appid=${apiKey}`;
  else return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
};

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

export default function BWeather({ appContext }: Props) {
  const apiErrorDefaults: ApiError = {};
  const forecastDefaults: WeatherObjectInterface = {};
  const currentWeatherDefaults: CurrentWeatherInterface = {};
  const [error, setError] = useState(apiErrorDefaults);
  const [forecastObject, setForecastObject] = useState(forecastDefaults);
  const [currentWeather, setCurrentWeather] = useState(currentWeatherDefaults);

  const latLong: string[] = appContext.pos.split(',') ?? null;

  useEffect(() => {
    if (appContext.ow_api && latLong) {
      // Only update daily forecast if it's >= 6 hours old or the weather object is null
      const forecastTime = localStorage.getItem('forecastTime');
      if (Date.now() >= Number(forecastTime) + 60 * 60 * 6 * 1000 || localStorage.getItem('forecastObject') === null) {
        console.log('One Call API called');
        fetch(apiUrl(latLong[0], latLong[1], appContext.ow_api, true))
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (!data.cod) {
              setForecastObject(data);
              localStorage.setItem('forecastObject', JSON.stringify(data));
              localStorage.setItem('forecastTime', String(Date.now()));
            } else {
              setTimeout(() => {
                setError({
                  cod: data.cod,
                  message: data.message,
                });
              }, 1000);
            }
          });
      } else {
        if (localStorage.getItem('forecastObject') !== null) {
          setForecastObject(JSON.parse(localStorage.getItem('forecastObject') ?? ''));
        }
      }

      // Only update current weather if it's >= 5 minutes old or the current weather object is null
      const currentWeatherTime = localStorage.getItem('currentWeatherTime');
      if (Date.now() >= Number(currentWeatherTime) + 60 * 5 * 1000 || localStorage.getItem('currentWeather') === null) {
        console.log('Current Weather API called');
        fetch(apiUrl(latLong[0], latLong[1], appContext.ow_api))
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.cod === 200) {
              setCurrentWeather(data);
              localStorage.setItem('currentWeather', JSON.stringify(data));
              localStorage.setItem('currentWeatherTime', String(Date.now()));
            } else {
              setTimeout(() => {
                setError({
                  cod: data.cod,
                  message: data.message,
                });
              }, 1000);
            }
          });
      } else {
        if (localStorage.getItem('currentWeather') !== null) {
          setCurrentWeather(JSON.parse(localStorage.getItem('currentWeather') ?? ''));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!appContext.ow_api || !forecastObject) return null;

  const weather: WeatherObjectInterface = {
    ...forecastObject,
    current: currentWeather,
  };

  const unit: number = Number(localStorage.getItem('unit')) ?? 2;
  const lastUpdated: number = Number(localStorage.getItem('currentWeatherTime')) ?? null;

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
    <div className="my-1 px-1 w-3/4 overflow-hidden">
      <BCard>
        <span className="flex w-full justify-center items-center">
          <div>
            {/* Icon & Current weather */}
            {weather.current?.main && (
              <>
                <div className="flex min-w-0 items-center">
                  <div className="inline-flex">
                    <Image
                      width="200"
                      height="200"
                      alt="Weather Condition"
                      src={`https://openweathermap.org/img/wn/${weatherImage}@2x.png`}
                    />
                    <dl className="text-sm font-medium whitespace-no-wrap m-auto">
                      <dt className="sr-only">Temperature</dt>
                      <dd className="text-gray-900 dark:text-gray-50 text-6xl font-light pb-2">
                        {convertTemperature(weather.current.main.temp, unit)}
                      </dd>
                      <dt className="sr-only">Cloudiness</dt>
                      <dd>
                        <a className="text-blue-700 dark:text-blue-200 text-lg font-light">{skyClarity}</a>
                      </dd>
                    </dl>
                  </div>

                  <div className="pl-24 pr-2">
                    <dl className="text-sm font-medium whitespace-no-wrap pb-4">
                      <dd className="text-gray-900 dark:text-gray-50 text-xl font-light">Real Feel</dd>
                      <dd className="text-blue-700 dark:text-blue-200 text-2xl font-normal">
                        {convertTemperature(weather.current.main.feels_like, unit)}
                      </dd>
                    </dl>
                    <dl className="text-sm font-medium whitespace-no-wrap">
                      <dd className="text-gray-900 dark:text-gray-50 text-xl font-light">Today&apos;s Low</dd>
                      <dd className="text-blue-700 dark:text-blue-200 text-2xl font-normal">
                        {convertTemperature(weather.current.main.temp_min, unit)}
                      </dd>
                    </dl>
                  </div>
                  <div className="px-24">
                    <dl className="text-sm font-medium whitespace-no-wrap pb-4">
                      <dd className="text-gray-900 dark:text-gray-50 text-xl font-light">Humidity</dd>
                      <dd className="text-blue-700 dark:text-blue-200 text-2xl font-normal">
                        {weather.current.main.humidity}%
                      </dd>
                    </dl>
                    <dl className="text-sm font-medium whitespace-no-wrap">
                      <dd className="text-gray-900 dark:text-gray-50 text-xl font-light">Today&apos;s High</dd>
                      <dd className="text-blue-700 dark:text-blue-200 text-2xl font-normal">
                        {convertTemperature(weather.current.main.temp_max, unit)}
                      </dd>
                    </dl>
                  </div>
                </div>
                {/* Add this later <div className="text-gray-600">Last updated: {moment(lastUpdated).fromNow()}</div> */}
              </>
            )}
          </div>

          {/*  */}
          <div className=""></div>
        </span>
      </BCard>
    </div>
  );
}

type ApiError = {
  cod?: number;
  message?: string;
};

type Props = {
  appContext: AppContextInterface;
};
