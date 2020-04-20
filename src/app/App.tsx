import React from 'react';
import { QueryRenderer } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import graphql from 'babel-plugin-relay/macro';

import { fetchQuery } from '../fetch_query';
import type {
  AppQuery,
  AppQueryResponse,
} from './__generated__/AppQuery.graphql';
import classes from './App.module.css';

const modernEnvironment: Environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export const App = () => (
  <QueryRenderer<AppQuery>
    environment={modernEnvironment}
    query={graphql`
      query AppQuery {
        hello
      }
    `}
    variables={{
      // Mock authenticated ID that matches database
      userId: 'me',
    }}
    render={({ error, props }: { error?: Error; props?: AppQueryResponse }) => {
      if (props) {
        return <div className={classes.app}>hello, {props.hello}</div>;
      } else if (error) {
        return <div>{error.message}</div>;
      }

      return <div>Loading</div>;
    }}
  />
);

export default App;
