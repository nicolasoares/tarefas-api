import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  vus: 5,
  duration: '20s',
  thresholds: {
    // SLO: 95% das requisições em menos de 300 ms
    http_req_duration: ['p(95)<300'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const criada = http.post(
    `${BASE_URL}/tarefas`,
    JSON.stringify({ titulo: 'Tarefa do smoke test' }),
    { headers: { 'Content-Type': 'application/json' } },
  );
  check(criada, { 'POST /tarefas retornou 201': (r) => r.status === 201 });

  const lista = http.get(`${BASE_URL}/tarefas`);
  check(lista, { 'GET /tarefas retornou 200': (r) => r.status === 200 });

  sleep(0.2);
}
