import gql from 'graphql-tag';

const typeDefs = gql`
    type Todo {
        id: String!
        text: String!
        completedAt: String
        createdAt: String!
    }

    input CreateTodoInput {
        text: String!
    }

    type Mutation {
        createTodo(input: CreateTodoInput!): Todo!
        completeTodo(id: String!): Todo!
    }

    type Query {
        findTodos: [Todo]
    }
`;

export default typeDefs;