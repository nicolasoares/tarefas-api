import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { criarApp } from '../src/app.js';
import { TarefaService } from '../src/tarefaService.js';
import { TarefaRepositoryMemoria } from '../src/repository/tarefaRepository.js';

function novoApp() {
  return criarApp(new TarefaService(new TarefaRepositoryMemoria()));
}

describe('integração: fluxo principal (criar -> listar)', () => {
  it('cria uma tarefa e depois a encontra na listagem', async () => {
    const app = novoApp();

    const criada = await request(app).post('/tarefas').send({ titulo: 'Entregar projeto' });
    expect(criada.status).toBe(201);
    expect(criada.body).toMatchObject({ id: 1, titulo: 'Entregar projeto', concluida: false });

    const lista = await request(app).get('/tarefas');
    expect(lista.status).toBe(200);
    expect(lista.body).toHaveLength(1);
    expect(lista.body[0].titulo).toBe('Entregar projeto');
  });

  it('responde 400 para título inválido', async () => {
    const res = await request(novoApp()).post('/tarefas').send({ titulo: 'x' });
    expect(res.status).toBe(400);
    expect(res.body.erro).toContain('pelo menos 3');
  });

  it('expõe health e métricas', async () => {
    const app = novoApp();
    const health = await request(app).get('/health');
    expect(health.body).toEqual({ status: 'ok' });

    const metrics = await request(app).get('/metrics');
    expect(metrics.status).toBe(200);
    expect(metrics.text).toContain('http_request_duration_seconds');
  });
});
