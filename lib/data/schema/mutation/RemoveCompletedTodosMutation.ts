import { GraphQLList, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { getViewer, removeCompletedTodos } from '../../database';
import { GraphQLUser } from '../node';
import { TodoApp_viewer } from 'src/__generated__/TodoApp_viewer.graphql';

// TODO: Support plural deletes
export const GraphQLRemoveCompletedTodosMutation = mutationWithClientMutationId(
  {
    name: 'RemoveCompletedTodos',
    inputFields: {},
    outputFields: {
      deletedTodoIds: {
        type: new GraphQLList(GraphQLString),
        resolve: ({ deletedTodoIds }): string[] => deletedTodoIds,
      },
      viewer: {
        type: GraphQLUser,
        resolve: (): TodoApp_viewer => getViewer(),
      },
    },
    mutateAndGetPayload: () => {
      const deletedTodoLocalIds = removeCompletedTodos();
      const deletedTodoIds = deletedTodoLocalIds.map(
        toGlobalId.bind(null, 'Todo'),
      );
      return { deletedTodoIds };
    },
  },
);
