import axios from 'axios';
import { WeatherData, BeachWeatherRequest } from '../types';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'demo_key';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000;

export const getWeatherByCity = async (request: BeachWeatherRequest): Promise<WeatherData> => {
  const cacheKey = `${request.city}-${request.state || ''}-${request.country || 'BR'}`;
  const cached = weatherCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }
  try {
    if (OPENWEATHER_API_KEY === 'demo_key') {
      const mockData = generateMockWeatherData(request.city);
      weatherCache.set(cacheKey, { data: mockData, timestamp: Date.now() });
      return mockData;
    }
    let locationQuery = request.city;
    if (request.state) {
      locationQuery += `,${request.state}`;
    }
    if (request.country) {
      locationQuery += `,${request.country}`;
    }
    const weatherResponse = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        q: locationQuery,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'pt_br'
      }
    });
    const { lat, lon } = weatherResponse.data.coord;
    let uvIndex = 0;
    try {
      const uvResponse = await axios.get(`${OPENWEATHER_BASE_URL}/uvi`, {
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY
        }
      });
      uvIndex = uvResponse.data.value;
    } catch (uvError) {
      console.warn('Erro ao buscar dados UV:', uvError);
    }
    const weatherData: WeatherData = {
      location: `${weatherResponse.data.name}, ${weatherResponse.data.sys.country}`,
      temperature: Math.round(weatherResponse.data.main.temp),
      humidity: weatherResponse.data.main.humidity,
      windSpeed: weatherResponse.data.wind.speed,
      windDirection: weatherResponse.data.wind.deg || 0,
      visibility: (weatherResponse.data.visibility || 10000) / 1000,
      uvIndex,
      description: weatherResponse.data.weather[0].description,
      icon: weatherResponse.data.weather[0].icon,
      pressure: weatherResponse.data.main.pressure,
      feelsLike: Math.round(weatherResponse.data.main.feels_like)
    };
    weatherCache.set(cacheKey, { data: weatherData, timestamp: Date.now() });
    return weatherData;
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
    const mockData = generateMockWeatherData(request.city);
    weatherCache.set(cacheKey, { data: mockData, timestamp: Date.now() });
    return mockData;
  }
};

const generateMockWeatherData = (city: string): WeatherData => {
  const mockTemperatures = [22, 25, 28, 30, 26, 24, 27];
  const mockDescriptions = [
    'céu limpo',
    'poucas nuvens', 
    'nuvens dispersas',
    'tempo bom',
    'parcialmente nublado'
  ];
  const randomTemp = mockTemperatures[Math.floor(Math.random() * mockTemperatures.length)];
  const randomDesc = mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)];
  return {
    location: `${city}, BR`,
    temperature: randomTemp,
    humidity: Math.floor(Math.random() * 30) + 60,
    windSpeed: Math.random() * 10 + 5,
    windDirection: Math.floor(Math.random() * 360),
    visibility: Math.random() * 5 + 10,
    uvIndex: Math.random() * 8 + 2,
    description: randomDesc,
    icon: '01d',
    pressure: Math.floor(Math.random() * 50) + 1000,
    feelsLike: randomTemp + Math.floor(Math.random() * 4) - 2
  };
};

export const getWeatherQualityIndicators = (weather: WeatherData) => {
  const indicators = [];
  if (weather.uvIndex > 8) {
    indicators.push({
      type: 'warning',
      message: `Índice UV muito alto (${weather.uvIndex.toFixed(1)}). Evite exposição prolongada.`
    });
  } else if (weather.uvIndex > 6) {
    indicators.push({
      type: 'caution',
      message: `Índice UV alto (${weather.uvIndex.toFixed(1)}). Use protetor solar.`
    });
  }
  if (weather.windSpeed > 15) {
    indicators.push({
      type: 'warning',
      message: `Ventos fortes (${weather.windSpeed.toFixed(1)} m/s). Mar agitado provável.`
    });
  }
  if (weather.visibility < 5) {
    indicators.push({
      type: 'caution',
      message: `Visibilidade reduzida (${weather.visibility.toFixed(1)} km).`
    });
  }
  if (weather.humidity > 85) {
    indicators.push({
      type: 'info',
      message: `Umidade muito alta (${weather.humidity}%). Sensação de abafamento.`
    });
  }
  return indicators;
};
