import moment from 'moment';
import uuid from 'uuid/v4';
import { userSchema } from './schemas';
import { Todo } from './types';

export const createTodo = async (text: string): Promise<Todo> => {
    const todo: Todo = {
        text,
        id: uuid(),
        completedAt: null,
        createdAt: moment().toDate(),
    };

    const validatedTodo = await userSchema.validate(todo);
    
    return validatedTodo; 
};