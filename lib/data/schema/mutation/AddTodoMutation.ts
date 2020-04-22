import { GraphQLNonNull, GraphQLString } from 'graphql';

import {
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import { addTodo, getTodo, getTodos, getViewer } from '../../database';

import { GraphQLUser, GraphQLTodoEdge } from '../node';

export const GraphQLAddTodoMutation = mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    todoEdge: {
      type: GraphQLTodoEdge,
      resolve: ({ localTodoId }) => {
        const todo = getTodo(localTodoId);
        return {
          cursor: cursorForObjectInConnection(getTodos(), todo),
          node: todo,
        };
      },
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({ text }) => {
    const localTodoId = addTodo(text);
    return { localTodoId };
  },
});
