import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb';
import { Function, FunctionProps } from '@aws-cdk/aws-lambda';
import { Construct, Stack } from '@aws-cdk/core';
import { GraphQlApi } from '@qest/aws-cdk-utils';

export interface TodoProps {
    handlerProps: FunctionProps;
}

export class Todos extends Stack {
    public constructor(scope: Construct, id: string, { handlerProps }: TodoProps) {
        super(scope, id);

        const todoTable = new Table(this, 'TodosTable', {
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'hashKey', type: AttributeType.STRING },
            sortKey: { name: 'sortKey', type: AttributeType.STRING },
        });

        const apolloHandler = new Function(this, 'ApolloHandler', handlerProps);
        apolloHandler.addEnvironment('TODO_TABLE_NAME', todoTable.tableName);

        const api = new GraphQlApi(this, 'TodoApi', { handler: apolloHandler });
    }
}