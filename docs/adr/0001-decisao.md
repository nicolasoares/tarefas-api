# ADR 0001: Repository em memória para guardar as tarefas

- **Status:** aceita
- **Data:** 12/11/2026

## Contexto
A API precisa guardar tarefas para o fluxo "criar -> listar". O projeto é de nível B,
com prazo curto, e o foco é mostrar engenharia (testes, CI, observabilidade, documentação),
não volume de dados.

## Decisão
Usar o **Repository Pattern** com uma implementação **em memória**
(`src/repository/tarefaRepository.js`). O serviço (`TarefaService`) recebe o repositório
por injeção de dependência e não sabe onde os dados ficam guardados.

## Alternativa descartada
**PostgreSQL com um ORM (Prisma/Knex).** Descartada porque adicionaria um segundo
container, migrações e configuração de teste (Testcontainers), sem mudar o que o projeto
precisa demonstrar neste nível. Como o serviço depende só da interface do repositório,
trocar para Postgres no futuro exige criar uma nova classe de repositório, sem mexer no
domínio nem nas rotas.

## Consequências
- (+) Testes rápidos e simples, CI leve.
- (+) Fronteira clara entre regra de negócio e armazenamento.
- (-) Os dados somem quando a aplicação reinicia.
