import { GraphQLString } from 'graphql';
import { GraphQLUser } from '../nodes';
import { User, getUserOrThrow } from '../../database';

type Input = {
  id: string;
};

export const UserQuery = {
  type: GraphQLUser,
  args: {
    id: { type: GraphQLString },
  },
  resolve: (root: {}, { id }: Input): User => getUserOrThrow(id),
};
