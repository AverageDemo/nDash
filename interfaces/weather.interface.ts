interface WeatherInfoInterface {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface FeelsLikeInterface {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface TempInterface {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

interface DailyWeatherInterface {
  clouds?: number;
  dew_point?: number;
  dt?: number;
  feels_like?: FeelsLikeInterface;
  humidity?: number;
  pressure?: number;
  sunrise?: number;
  sunset?: number;
  temp?: TempInterface;
  uvi?: number;
  visibility?: number;
  weather?: WeatherInfoInterface[];
  wind_deg?: number;
  wind_gust?: number;
  wind_speed?: number;
  moon_phase?: number;
  moonrise?: number;
  moonset?: number;
  pop?: number;
}

export interface CurrentWeatherInterface {
  clouds?: { all: number };
  dt?: number;
  main?: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather?: WeatherInfoInterface[];
  wind?: {
    speed: number;
    deg: number;
    gust: number;
  };
}

export interface WeatherObjectInterface {
  lat?: number;
  lon?: number;
  timezone?: string;
  current?: CurrentWeatherInterface;
  daily?: DailyWeatherInterface[];
}
