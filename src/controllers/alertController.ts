import { Request, Response } from 'express';
import { createAlert, getAllAlerts } from '../services/alertService';
import { CreateAlertRequest } from '../types';

export const createAlertController = (req: Request, res: Response): void => {
  try {
    const { beachName, alert } = req.body as CreateAlertRequest;
    if (!beachName || !alert) {
      res.status(400).json({ 
        error: 'Nome da praia e alerta são obrigatórios' 
      });
      return;
    }
    const newAlert = createAlert({ beachName, alert });
    res.status(201).json(newAlert);
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

export const getAllAlertsController = (req: Request, res: Response): void => {
  try {
    const alerts = getAllAlerts();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};
