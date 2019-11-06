import { IApp } from '.';
import { inMemTodoStorage } from '../adapters/todo-storage';
import { completeTodoPort } from '../app/ports/complete-todo';
import { createTodoPort } from '../app/ports/create-todo';
import { findTodoPort } from '../app/ports/find-todo';
import { findTodosPort } from '../app/ports/find-todos';

const { findTodo, saveTodo, findTodos } = inMemTodoStorage();

const app: IApp = {
    completeTodo: completeTodoPort({ saveTodo, findTodo }),
    createTodo: createTodoPort({ saveTodo }),
    findTodo: findTodoPort({ findTodo }),
    findTodos: findTodosPort({ findTodos }),
};

export default app;