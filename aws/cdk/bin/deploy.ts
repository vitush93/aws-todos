
import { Code, Runtime } from '@aws-cdk/aws-lambda';
import { App } from '@aws-cdk/core';
import { Todos } from '../stacks/todos';

const app = new App();

const stack = new Todos(app, 'Todos', {
    handlerProps: {
        code: Code.asset('dist/apollo-handler'),
        runtime: Runtime.NODEJS_8_10,
        handler: 'index.handler',
    },
});
