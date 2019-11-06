import { completeTodo } from '../domain';
import { IFindTodo, ISaveTodo } from '../effects/todos';
import { Todo } from '../types';
import { TodoError, TodoErrorType } from './errors';
import { findTodoPort } from './find-todo';

export interface ICompleteTodoEffects extends ISaveTodo, IFindTodo {}

export interface ICompleteTodoInput {
    id: string;
}

export type CompleteTodoOutput = { todo: Todo };
export type CompleteTodo = (input: ICompleteTodoInput) => Promise<CompleteTodoOutput>;
export type CompleteTodoPort = (effects: ICompleteTodoEffects) => CompleteTodo;

const toCompleteTodoOutput = (todo: Todo) => ({ todo });

export const completeTodoPort: CompleteTodoPort = ({ saveTodo, findTodo }) => async ({ id }) => {
    const { todo } = await findTodoPort({ findTodo })({ id });

    try {
        await completeTodo(todo);
    } catch (err) {
        throw new TodoError({
            type: TodoErrorType.COMPLETE_TODO_FAILED,
            message: err.message,
            payload: { todo },
            previousError: err,
        });
    }

    try {
        await saveTodo(todo);
    } catch (err) {
        throw new TodoError({
            type: TodoErrorType.STORAGE_ERROR,
            message: err.message,
            payload: { todo },
            previousError: err,
        });
    }

    return toCompleteTodoOutput(todo);
};
