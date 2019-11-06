import { Todo } from '../types';

export interface IFindTodo {
    findTodo(id: string): Promise<Todo | null>;
}

export interface ISaveTodo {
    saveTodo(todo: Todo): Promise<Todo>;
}

export interface IFindTodos {
    findTodos(): Promise<Todo[]>;
}

export interface ITodoEffects extends IFindTodo, ISaveTodo, IFindTodos {}