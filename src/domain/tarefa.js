// Regras de negócio puras: não conhecem Express nem banco de dados.
export function criarTarefa({ id, titulo }) {
  if (typeof titulo !== 'string' || titulo.trim().length < 3) {
    throw new Error('O título deve ter pelo menos 3 caracteres');
  }
  return { id, titulo: titulo.trim(), concluida: false };
}

export function concluirTarefa(tarefa) {
  return { ...tarefa, concluida: true };
}
