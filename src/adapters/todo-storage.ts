import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ITodoEffects } from '../app/effects/todos';
import { Todo } from '../app/types';
import { findTodo, findTodos, saveTodo } from '../services/todos-dynamodb';

export const dynamoTodoStorage = (docClient: DocumentClient): ITodoEffects => ({
    findTodo: findTodo(docClient),
    findTodos: findTodos(docClient),
    saveTodo: saveTodo(docClient),
});

export const inMemTodoStorage = (): ITodoEffects => {
    const todos: Todo[] = [];

    return {
        findTodo: async (id) => todos.find(todo => todo.id === id),
        findTodos: async () => [...todos],
        saveTodo: async (todo) => Promise.resolve()
            .then(() => todos.push(todo))
            .then(() => todo),
    };
};