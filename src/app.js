import express from 'express';
import { logger } from './logger.js';
import { registry, duracaoHttp } from './metrics.js';

export function criarApp(tarefaService) {
  const app = express();
  app.use(express.json());

  // Middleware: mede a duração e escreve um log estruturado por requisição.
  app.use((req, res, next) => {
    const fim = duracaoHttp.startTimer();
    res.on('finish', () => {
      const route = req.route?.path || req.path;
      fim({ method: req.method, route, status: res.statusCode });
      logger.info({ method: req.method, route, status: res.statusCode }, 'requisição');
    });
    next();
  });

  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  app.get('/tarefas', (req, res) => res.json(tarefaService.listar()));

  app.post('/tarefas', (req, res) => {
    try {
      const tarefa = tarefaService.criar(req.body?.titulo);
      res.status(201).json(tarefa);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  });

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', registry.contentType);
    res.send(await registry.metrics());
  });

  return app;
}
