import client from 'prom-client';

export const registry = new client.Registry();

// Métrica do SLO: duração das requisições (para calcular o p95).
export const duracaoHttp = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP em segundos',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.025, 0.05, 0.1, 0.3, 0.5, 1],
  registers: [registry],
});
