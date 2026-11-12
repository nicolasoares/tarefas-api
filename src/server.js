import 'dotenv/config';
import { criarApp } from './app.js';
import { TarefaService } from './tarefaService.js';
import { TarefaRepositoryMemoria } from './repository/tarefaRepository.js';
import { logger } from './logger.js';

const porta = process.env.PORT || 3000;
const service = new TarefaService(new TarefaRepositoryMemoria());

criarApp(service).listen(porta, () => {
  logger.info({ porta }, 'API no ar');
});
