import { GraphQLObjectType } from 'graphql';

import { getViewer } from '../database';
import { GraphQLUser, nodeField } from './node';

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
    node: nodeField,
  },
});
