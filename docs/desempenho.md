# Desempenho

## SLO declarado
**95% das requisições (p95) respondem em menos de 300 ms** (fluxo `POST /tarefas` + `GET /tarefas`).

A métrica `http_request_duration_seconds` (histograma, em `/metrics`) permite acompanhar isso.

## Smoke test (k6)
Script: `k6/smoke.js` (5 usuários virtuais, 20 segundos).

Como rodar (com a API no ar via `docker compose up --build`):

```bash
# k6 instalado localmente
k6 run k6/smoke.js

# ou via Docker (Mac/Windows)
docker run --rm -i -e BASE_URL=http://host.docker.internal:3000 grafana/k6 run - < k6/smoke.js
```

## Resultado medido

> PREENCHA depois de rodar o k6 na sua máquina:

- Data da medição: __/11/2026
- p95 de `http_req_duration`: ___ ms
- Taxa de falhas (`http_req_failed`): ___ %
- SLO atingido (p95 < 300 ms)? sim / não
