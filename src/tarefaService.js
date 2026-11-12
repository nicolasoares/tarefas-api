import { criarTarefa } from './domain/tarefa.js';

// O repositório é recebido de fora (injeção de dependência -> o "D" do SOLID).
export class TarefaService {
  constructor(repository) {
    this.repository = repository;
  }

  criar(titulo) {
    const tarefa = criarTarefa({ id: this.repository.gerarId(), titulo });
    return this.repository.salvar(tarefa);
  }

  listar() {
    return this.repository.listar();
  }
}
