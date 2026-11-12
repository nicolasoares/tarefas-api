**Nível: B (simples)**

# API de Tarefas

Projeto Final do curso Full Cycle (Módulo 4). API de domínio único para criar e listar tarefas.

**Fluxo principal:** `POST /tarefas` (cria) -> `GET /tarefas` (lista).

## Como subir

Com Docker (um comando):

```bash
docker compose up --build
```

Ou localmente, sem Docker (Node 22+):

```bash
cp .env.example .env
npm install
npm start
```

A API fica em `http://localhost:3000`.

## Como usar

```bash
curl -X POST localhost:3000/tarefas -H "Content-Type: application/json" -d '{"titulo":"Estudar Docker"}'
curl localhost:3000/tarefas
curl localhost:3000/health
curl localhost:3000/metrics
```

## Como testar

```bash
npm install
npm run lint            # ESLint
npm test                # testes (unitários do domínio + 1 de integração)
npm run test:coverage   # testes + coverage (mínimo declarado: 80% linhas/funções)
```

O CI (`.github/workflows/ci.yml`) roda install, lint e testes com coverage a cada push.

## Estrutura

```
.
├─ docker-compose.yml
├─ Dockerfile
├─ README.md
├─ CONTRIBUTORS.md
├─ docs/
│  ├─ adr/0001-decisao.md   # decisão: Repository em memória
│  ├─ openapi.yaml          # contrato da API (OpenAPI 3.1)
│  ├─ desempenho.md         # SLO e resultado do k6
│  └─ ia.md                 # uso de IA
├─ k6/smoke.js              # smoke test com p95
├─ src/                     # domain, repository, service, app
├─ tests/
└─ .github/workflows/ci.yml
```

## Observabilidade

- **Logs estruturados** (JSON) com pino, uma linha por requisição.
- **Métrica:** `http_request_duration_seconds` (histograma) em `/metrics`.
- **SLO:** 95% das requisições em menos de 300 ms (detalhes em `docs/desempenho.md`).

## Configuração e segredos

Configuração via variáveis de ambiente. O `.env.example` mostra as variáveis; o `.env` real
fica fora do repositório (`.gitignore`). Este projeto não usa nenhum segredo.

## Decisões de design

- **SOLID:** o `TarefaService` recebe o repositório por injeção de dependência.
- **Pattern:** Repository (justificado na ADR 0001).
