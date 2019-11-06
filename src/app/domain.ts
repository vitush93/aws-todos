import moment from 'moment';
import { Todo } from './types';

// export const completeTodo = (todo: Todo): Todo => ({
//     ...todo,
//     completedAt: moment().toDate(),
// });

export const completeTodo = async (todo: Todo): Promise<Todo> => {
    todo.completedAt = moment().toDate();

    return todo;
};