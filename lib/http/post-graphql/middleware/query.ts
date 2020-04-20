import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../schema.graphql';

// read resolvers
import { readAccount, mutateAccount, hello } from '../resolvers';

// combine resolvers and schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    TestQuery: { hello, account: readAccount },
    TestMutation: { account: mutateAccount },
  },
});

/** graphql middleware */
export const query = async ({ body, session }) => {
  try {
    const result = await graphql(
      schema,
      body.query,
      {},
      session,
      body.variables,
      body.operationName,
    );
    return {
      json: result,
    };
  } catch (e) {
    return {
      json: { error: e.name, message: e.message, stack: e.stack },
    };
  }
};
