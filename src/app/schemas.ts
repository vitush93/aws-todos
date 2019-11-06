import { date, object, ObjectSchema, string } from 'yup';
import { Todo } from './types';

export const MAX_TODO_TEXT_LENGTH = 50;

export const userSchema: ObjectSchema<Todo> = object().shape({
    id: string().required(),
    text: string().max(MAX_TODO_TEXT_LENGTH).required(),
    completedAt: date().nullable().default(null),
    createdAt: date().required(),
});