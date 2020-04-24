import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import { getTodo, renameTodo } from '../../database';
import { GraphQLTodo } from '../node';
import { Todo_todo } from 'src/__generated__/Todo_todo.graphql';

export const GraphQLRenameTodoMutation = mutationWithClientMutationId({
  name: 'RenameTodo',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    todo: {
      type: GraphQLTodo,
      resolve: ({ localTodoId }): Todo_todo => getTodo(localTodoId),
    },
  },
  mutateAndGetPayload: ({ id, text }) => {
    const localTodoId = fromGlobalId(id).id;
    renameTodo(localTodoId, text);
    return { localTodoId };
  },
});
