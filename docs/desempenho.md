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

Medido com `k6/smoke.js` (5 usuários virtuais, 20 segundos), contra a API rodando via `docker compose up --build` na minha máquina.

- Data da medição: 12/11/2026
- Requisições: 940 (470 iterações de POST + GET)
- p95 de `http_req_duration`: 12,59 ms
- Média: 6,21 ms | Máximo: 38,33 ms
- Taxa de falhas (`http_req_failed`): 0,00 %
- Checagens: 940 de 940 passaram
- SLO atingido (p95 < 300 ms)? **Sim**

## Limitações da medição

O teste foi rodado localmente, com carga baixa e com o repositório em memória (sem banco de dados), então o resultado é otimista. Com um banco real e tráfego maior, o p95 tende a subir. Como próximo passo, eu repetiria a medição com Postgres e mais usuários virtuais.