import { BaseError } from '@qest/error-utils';

export class TodoNotFoundError extends Error {}

export class TodoError extends BaseError<TodoErrorType> {}

export enum TodoErrorType {
    STORAGE_ERROR = 'STORAGE_ERROR',
    TODO_NOT_FOUND = 'TODO_NOT_FOUND',
    TODO_VALIDATION_FAILED = 'TODO_VALIDATION_FAILED',
    COMPLETE_TODO_FAILED = 'COMPLETE_TODO_FAILED',
}