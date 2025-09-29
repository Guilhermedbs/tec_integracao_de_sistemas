import { Alert, CreateAlertRequest } from '../types';

const alerts: Alert[] = [];

export const createAlert = (alertData: CreateAlertRequest): Alert => {
  const newAlert: Alert = {
    id: Math.random().toString(36).substr(2, 9),
    beachName: alertData.beachName,
    alert: alertData.alert,
    createdAt: new Date()
  };
  alerts.push(newAlert);
  return newAlert;
};

export const getAllAlerts = (): Alert[] => {
  return alerts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
