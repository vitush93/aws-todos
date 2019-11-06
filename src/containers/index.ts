import { CompleteTodo } from '../app/ports/complete-todo';
import { CreateTodo } from '../app/ports/create-todo';
import { FindTodo } from '../app/ports/find-todo';
import { FindTodos } from '../app/ports/find-todos';

export interface IApp {
    findTodo: FindTodo;
    findTodos: FindTodos;
    completeTodo: CompleteTodo;
    createTodo: CreateTodo;
}

const env = process.env.NODE_ENV || 'production';

const allowedEnvs = ['dev', 'test', 'production'];
if (!allowedEnvs.includes(env)) {
    throw new Error(`Environment ${env} not recognized, allowed values: ${allowedEnvs.join(', ')}`);
}

const container: IApp = require(`./${env}.ts`).default;

export default container;
