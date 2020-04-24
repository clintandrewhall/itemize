import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import { changeTodoStatus, getTodo, getViewer } from '../../database';
import { GraphQLUser, GraphQLTodo } from '../node';
import { TodoApp_viewer } from 'src/__generated__/TodoApp_viewer.graphql';
import { Todo_todo } from 'src/__generated__/Todo_todo.graphql';

export const GraphQLChangeTodoStatusMutation = mutationWithClientMutationId({
  name: 'ChangeTodoStatus',
  inputFields: {
    complete: { type: new GraphQLNonNull(GraphQLBoolean) },
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    todo: {
      type: GraphQLTodo,
      resolve: ({ localTodoId }): Todo_todo => getTodo(localTodoId),
    },
    viewer: {
      type: GraphQLUser,
      resolve: (): TodoApp_viewer => getViewer(),
    },
  },
  mutateAndGetPayload: ({ id, complete }) => {
    const localTodoId = fromGlobalId(id).id;
    changeTodoStatus(localTodoId, complete);
    return { localTodoId };
  },
});
