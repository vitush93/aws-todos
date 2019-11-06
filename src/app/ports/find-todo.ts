import { IFindTodo } from '../effects/todos';
import { Todo } from '../types';
import { TodoError, TodoErrorType, TodoNotFoundError } from './errors';

export interface IFindTodoEffects extends IFindTodo {}

export interface IFindTodoInput {
    id: string;
}

export type FindTodoOutput = { todo: Todo };
export type FindTodo = (input: IFindTodoInput) => Promise<FindTodoOutput>;
export type FindTodoPort = (effects: IFindTodoEffects) => FindTodo;

const toFindTodoOutput = (todo: Todo) => ({ todo });

export const findTodoPort: FindTodoPort = ({ findTodo }) => async ({ id }) => {
    let todo: Todo;
    try {
        todo = await findTodo(id);

        if (!todo) {
            throw new TodoNotFoundError(`Todo ${id} not found.`);
        }
    } catch (err) {
        if (err instanceof TodoNotFoundError) {
            throw new TodoError({
                type: TodoErrorType.TODO_NOT_FOUND,
                message: err.message,
                payload: { id },
                previousError: err,
            });
        }

        throw new TodoError({
            type: TodoErrorType.STORAGE_ERROR,
            message: err.message,
            payload: { id },
            previousError: err,
        });
    }

    return toFindTodoOutput(todo);
};
