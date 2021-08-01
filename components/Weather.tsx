import { useState, useEffect } from 'react';

import BWeather from '@/blocks/BWeather';
import { AppContextInterface } from '@/context/AppContext';
import type { CurrentWeatherInterface, WeatherObjectInterface } from '@/interfaces/weather.interface';

const apiUrl = (lat: string, lon: string, apiKey: string, oneCall: boolean = false) => {
  // Change API here if need be
  if (oneCall)
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current&appid=${apiKey}`;
  else return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
};

export default function Weather({ appContext }: Props) {
  const apiErrorDefaults: ApiError = {};
  const forecastDefaults: WeatherObjectInterface = {};
  const currentWeatherDefaults: CurrentWeatherInterface = {};
  const [error, setError] = useState(apiErrorDefaults);
  const [forecastObject, setForecastObject] = useState(forecastDefaults);
  const [currentWeather, setCurrentWeather] = useState({});

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

  return (
    <>
      <BWeather weather={weather} />
    </>
  );
}

type ApiError = {
  cod?: number;
  message?: string;
};

type Props = {
  appContext: AppContextInterface;
};
