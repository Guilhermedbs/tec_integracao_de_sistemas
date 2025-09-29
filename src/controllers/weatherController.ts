import { Request, Response } from 'express';
import { getWeatherByCity, getWeatherQualityIndicators } from '../services/weatherService';
import { BeachWeatherRequest } from '../types';

export const getBeachWeatherController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { city, state, country } = req.query as Partial<BeachWeatherRequest>;
    if (!city) {
      res.status(400).json({ 
        error: 'Parâmetro city é obrigatório' 
      });
      return;
    }
    const weatherRequest: BeachWeatherRequest = {
      city: city as string,
      state: state as string,
      country: (country as string) || 'BR'
    };
    const weatherData = await getWeatherByCity(weatherRequest);
    const qualityIndicators = getWeatherQualityIndicators(weatherData);
    res.json({
      weather: weatherData,
      qualityIndicators
    });
  } catch (error) {
    console.error('Erro ao buscar dados meteorológicos:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor ao buscar dados meteorológicos' 
    });
  }
};
