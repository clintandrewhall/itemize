import { GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { getTodo, getViewer, markAllTodos } from '../../database';
import { GraphQLTodo, GraphQLUser } from '../node';

export const GraphQLMarkAllTodosMutation = mutationWithClientMutationId({
  name: 'MarkAllTodos',
  inputFields: {
    complete: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  outputFields: {
    changedTodos: {
      type: new GraphQLList(GraphQLTodo),
      resolve: ({ changedTodoLocalIds }) => changedTodoLocalIds.map(getTodo),
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({ complete }) => {
    const changedTodoLocalIds = markAllTodos(complete);
    return { changedTodoLocalIds };
  },
});
