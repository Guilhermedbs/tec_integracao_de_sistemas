import { Router } from 'express';
import { createAlertController, getAllAlertsController } from '../controllers/alertController';
import { getBeachWeatherController } from '../controllers/weatherController';

const router = Router();

router.post('/alerts', createAlertController);
router.get('/alerts', getAllAlertsController);
router.get('/weather', getBeachWeatherController);

export default router;
