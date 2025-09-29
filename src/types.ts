export interface Alert {
  id: string;
  beachName: string;
  alert: string;
  createdAt: Date;
}

export interface CreateAlertRequest {
  beachName: string;
  alert: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  uvIndex: number;
  description: string;
  icon: string;
  pressure: number;
  feelsLike: number;
}

export interface BeachWeatherRequest {
  city: string;
  state?: string;
  country?: string;
}
