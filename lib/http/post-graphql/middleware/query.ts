import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import fs from 'fs';
import path from 'path';

// 1. read resolvers
import { account, draft, drafts, save, destroy } from '../resolvers';

// 2. read the schema
let typeDefs = fs
  .readFileSync(path.join(__dirname, '..', 'schema.graphql'))
  .toString();

// 3. combine resolvers and schema
let schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: { draft, drafts },
    Mutation: { account, save, destroy },
  },
});

/** graphql middleware */
export const query = async ({ body, session }) => {
  try {
    let result = await graphql(
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
