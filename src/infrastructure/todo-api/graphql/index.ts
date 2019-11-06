import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda';
import resolvers from './resolvers';
import typeDefs from './schema';

export const schema = makeExecutableSchema({
    resolvers,
    typeDefs: [typeDefs],
});

const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    debug: true,
    tracing: true,
});

export const handler = server.createHandler({
    cors: {
        origin: '*',
        allowedHeaders: [
            'Access-Control-Allow-Headers',
            'Authorization',
            'Origin',
            'Accept',
            'X-Requested-With',
            'Content-Type',
            'Access-Control-Request-Method',
            'Access-Control-Request-Headers',
            'Request-Context',
        ],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE',
    },
});