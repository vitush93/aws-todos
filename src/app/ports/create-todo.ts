import { ISaveTodo } from '../effects/todos';
import { createTodo } from '../factories';
import { Todo } from '../types';
import { TodoError, TodoErrorType } from './errors';

export interface ICreateTodoEffects extends ISaveTodo {}

export interface ICreateTodoInput {
    text: string;
}

export type CreateTodoOutput = { todo: Todo };
export type CreateTodo = (input: ICreateTodoInput) => Promise<CreateTodoOutput>;
export type CreateTodoPort = (effects: ICreateTodoEffects) => CreateTodo;

const toCreateTodoOutput = (todo: Todo) => ({ todo });

export const createTodoPort: CreateTodoPort = ({ saveTodo }) => async ({ text }) => {
    let todo: Todo;
    try {
        todo = await createTodo(text);
    } catch (err) {
        throw new TodoError({
            type: TodoErrorType.TODO_VALIDATION_FAILED,
            message: err.message,
            payload: { text },
            previousError: err,
        });
    }

    try {
        await saveTodo(todo);
    } catch (err) {
        throw new TodoError({
            type: TodoErrorType.STORAGE_ERROR,
            message: err.message,
            payload: { text },
            previousError: err,
        });
    }

    return toCreateTodoOutput(todo);
};
