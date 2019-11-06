import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { IApp } from '.';
import { dynamoTodoStorage } from '../adapters/todo-storage';
import { completeTodoPort } from '../app/ports/complete-todo';
import { createTodoPort } from '../app/ports/create-todo';
import { findTodoPort } from '../app/ports/find-todo';
import { findTodosPort } from '../app/ports/find-todos';
import config from '../config/todo-api';

const docClient = new DocumentClient({
    params: {
        TableName: config.todoTableName,
    },
});

const { findTodo, saveTodo, findTodos } = dynamoTodoStorage(docClient);

const app: IApp = {
    completeTodo: completeTodoPort({ saveTodo, findTodo }),
    createTodo: createTodoPort({ saveTodo }),
    findTodo: findTodoPort({ findTodo }),
    findTodos: findTodosPort({ findTodos }),
};

export default app;