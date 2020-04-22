import { graphql } from 'graphql';
import { schema } from '../../../data/schema';

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
