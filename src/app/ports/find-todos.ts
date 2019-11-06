import { IFindTodos } from '../effects/todos';
import { Todo } from '../types';
import { TodoError, TodoErrorType } from './errors';

export interface IFindTodosEffects extends IFindTodos {}

export interface IFindTodosInput {}

export type FindTodosOutput = { todos: Todo[] };
export type FindTodos = (input: IFindTodosInput) => Promise<FindTodosOutput>;
export type FindTodosPort = (effects: IFindTodosEffects) => FindTodos;

const toFindTodosOutput = (todos: Todo[]) => ({ todos });

export const findTodosPort: FindTodosPort = ({ findTodos }) => async () => {
    let todos: Todo[];
    try {
        todos = await findTodos();
    } catch (err) {
        throw new TodoError({
            type: TodoErrorType.STORAGE_ERROR,
            message: err.message,
            previousError: err,
        });
    }

    return toFindTodosOutput(todos);
};
