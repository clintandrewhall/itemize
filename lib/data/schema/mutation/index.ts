import { GraphQLObjectType } from 'graphql';

import { GraphQLAddTodoMutation } from './AddTodoMutation';
import { GraphQLChangeTodoStatusMutation } from './ChangeTodoStatusMutation';
import { GraphQLMarkAllTodosMutation } from './MarkAllTodosMutation';
import { GraphQLRemoveCompletedTodosMutation } from './RemoveCompletedTodosMutation';
import { GraphQLRemoveTodoMutation } from './RemoveTodoMutation';
import { GraphQLRenameTodoMutation } from './RenameTodoMutation';

export * from './AddTodoMutation';
export * from './ChangeTodoStatusMutation';
export * from './MarkAllTodosMutation';
export * from './RemoveCompletedTodosMutation';
export * from './RemoveTodoMutation';
export * from './RenameTodoMutation';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: GraphQLAddTodoMutation,
    changeTodoStatus: GraphQLChangeTodoStatusMutation,
    markAllTodos: GraphQLMarkAllTodosMutation,
    removeCompletedTodos: GraphQLRemoveCompletedTodosMutation,
    removeTodo: GraphQLRemoveTodoMutation,
    renameTodo: GraphQLRenameTodoMutation,
  },
});
