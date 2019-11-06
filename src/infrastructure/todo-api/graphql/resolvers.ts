import { ApolloError, UserInputError } from 'apollo-server-core';
import moment from 'moment';
import { TodoError, TodoErrorType } from '../../../app/ports/errors';
import { Todo } from '../../../app/types';
import App from './../../../containers';

const todoToGraphqlType = ({ id, text, createdAt, completedAt }: Todo): object => ({
    id,
    text,
    createdAt: moment(createdAt).toISOString(),
    completedAt: completedAt ? moment(completedAt).toISOString() : null,
});

const createTodo = async (_, { input: {text} }, context) => {
    try {
        const { todo } = await App.createTodo({text});

        return todoToGraphqlType(todo);
    } catch (err) {
        if (err instanceof TodoError) {
            if (err.type === TodoErrorType.TODO_VALIDATION_FAILED) {
                throw new UserInputError(err.message);
            }

            throw new ApolloError(err.message, err.type);
        }
        
        throw new ApolloError(err.message, 'INTERNAL_SERVER_ERROR');
    }
};

const completeTodo = async (_, { id }, context) => {
    try {
        const { todo } = await App.completeTodo({ id });

        return todoToGraphqlType(todo);
    } catch (err) {
        throw new ApolloError(err.message, err.type);
    }
};

const findTodos = async () => {
    try {
        const { todos } = await App.findTodos({});

        return todos.map(todoToGraphqlType);
    } catch (err) {
        throw new ApolloError(err.message, 'INTERNAL_SERVER_ERROR');
    }
};

export default {
    Query: {
        findTodos,
    },
    Mutation: {
        createTodo,
        completeTodo,
    },
};