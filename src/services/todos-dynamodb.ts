import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import moment from 'moment';
import { Todo } from '../app/types';

export enum RecordTypes {
    TODO = 'TODO',
}

export type TodoRecord = {
    hashKey: string;
    sortKey: string;
    text: string;
    completedAt: string;
    createdAt: string;
};

const todoKey = (id: string) => ({
    hashKey: id,
    sortKey: RecordTypes.TODO,
});

export const hydrateTodo = ({hashKey, text, completedAt, createdAt}: TodoRecord): Todo => ({
    text,
    id: hashKey,
    completedAt: completedAt ? moment(completedAt).toDate() : null,
    createdAt: moment(createdAt).toDate(),
});

export const findTodo = (docClient: DocumentClient) => (id: string): Promise<Todo | null> =>
    docClient.get(<any>{
        Key: todoKey(id),
    })
    .promise()
    .then(record => record.Item as Todo);

export const saveTodo = (docClient: DocumentClient) => (todo: Todo): Promise<Todo> => docClient.update(<any>{
    Key: todoKey(todo.id),
    UpdateExpression: `SET 
        text = :text,
        completedAt = :completedAt,
        createdAt = :createdAt,
    `,
    ExpressionAttributeValues: {
        ':text': todo.text,
        ':completedAt': todo.completedAt ? moment(todo.completedAt).toISOString() : null,
        ':createdAt': moment(todo.createdAt).toISOString(),
    },
    ConditionExpression: 'attribute_not_exists(hashKey) OR hashKey = :userId',
    ReturnValues: 'ALL_NEW',
})
    .promise()
    .then(record => record.Attributes as Todo);

export const findTodos = (docClient: DocumentClient) => (): Promise<Todo[]> => docClient.query(<any>{
    KeyConditionExpression: 'sortKey = :sortKey',
    ExpressionAttributeValues: {
        ':sortKey': RecordTypes.TODO,
    },
})
    .promise()
    .then(result => result.Items as TodoRecord[])
    .then(records => records.map(hydrateTodo));