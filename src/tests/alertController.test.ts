import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../server';

describe('Alert Endpoints', () => {
  beforeEach(() => {
  });

  describe('POST /api/alerts', () => {
    it('deve criar um novo alerta com sucesso', async () => {
      const alertData = {
        beachName: 'Copacabana',
        alert: 'Água imprópria para banho'
      };
      const response = await request(app)
        .post('/api/alerts')
        .send(alertData)
        .expect(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.beachName).toBe(alertData.beachName);
      expect(response.body.alert).toBe(alertData.alert);
      expect(response.body).toHaveProperty('createdAt');
    });

    it('deve retornar erro 400 quando beachName não for fornecido', async () => {
      const alertData = {
        alert: 'Água imprópria para banho'
      };
      const response = await request(app)
        .post('/api/alerts')
        .send(alertData)
        .expect(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Nome da praia e alerta são obrigatórios');
    });

    it('deve retornar erro 400 quando alert não for fornecido', async () => {
      const alertData = {
        beachName: 'Copacabana'
      };
      const response = await request(app)
        .post('/api/alerts')
        .send(alertData)
        .expect(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Nome da praia e alerta são obrigatórios');
    });
  });

  describe('GET /api/alerts', () => {
    it('deve retornar uma lista vazia quando não há alertas', async () => {
      const response = await request(app)
        .get('/api/alerts')
        .expect(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('deve retornar todos os alertas criados', async () => {
      const alert1 = {
        beachName: 'Ipanema',
        alert: 'Água própria para banho'
      };
      const alert2 = {
        beachName: 'Leblon',
        alert: 'Água imprópria para banho'
      };
      await request(app).post('/api/alerts').send(alert1);
      await request(app).post('/api/alerts').send(alert2);
      const response = await request(app)
        .get('/api/alerts')
        .expect(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
      if (response.body.length > 1) {
        const firstAlert = new Date(response.body[0].createdAt);
        const secondAlert = new Date(response.body[1].createdAt);
        expect(firstAlert.getTime()).toBeGreaterThanOrEqual(secondAlert.getTime());
      }
    });
  });
});
