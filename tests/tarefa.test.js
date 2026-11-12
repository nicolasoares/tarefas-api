import { describe, it, expect } from 'vitest';
import { criarTarefa, concluirTarefa } from '../src/domain/tarefa.js';

describe('domínio: tarefa', () => {
  it('cria uma tarefa válida, não concluída', () => {
    const t = criarTarefa({ id: 1, titulo: '  Estudar Docker ' });
    expect(t).toEqual({ id: 1, titulo: 'Estudar Docker', concluida: false });
  });

  it('rejeita título curto', () => {
    expect(() => criarTarefa({ id: 1, titulo: 'ab' })).toThrow('pelo menos 3');
  });

  it('rejeita título que não é texto', () => {
    expect(() => criarTarefa({ id: 1, titulo: undefined })).toThrow();
  });

  it('conclui uma tarefa sem alterar a original', () => {
    const original = criarTarefa({ id: 1, titulo: 'Escrever README' });
    const feita = concluirTarefa(original);
    expect(feita.concluida).toBe(true);
    expect(original.concluida).toBe(false);
  });
});
