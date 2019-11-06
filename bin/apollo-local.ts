import { ApolloServer } from 'apollo-server';
import { schema } from '../src/infrastructure/todo-api/graphql';

const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    debug: true,
    tracing: true,
});

server.listen({ port: 8080, originHeader: '*' }).then(({url}) => console.log(`🚀 Server ready at ${url}`));

