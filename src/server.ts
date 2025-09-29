import express from 'express';
import cors from 'cors';
import path from 'path';
import alertRoutes from './routes/alertRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', alertRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Frontend disponível em http://localhost:${PORT}`);
  console.log(`API disponível em http://localhost:${PORT}/api`);
});

export default app;
