// Repository Pattern: o serviço fala com esta interface, não com o "banco".
// Hoje guarda em memória; amanhã poderia ser Postgres sem mudar o serviço.
export class TarefaRepositoryMemoria {
  constructor() {
    this.tarefas = [];
    this.proximoId = 1;
  }

  gerarId() {
    return this.proximoId++;
  }

  salvar(tarefa) {
    this.tarefas.push(tarefa);
    return tarefa;
  }

  listar() {
    return [...this.tarefas];
  }
}
