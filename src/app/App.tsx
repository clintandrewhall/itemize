/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import 'todomvc-common';
import 'todomvc-app-css/index.css';

import * as React from 'react';

import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import TodoApp from './components/TodoApp';
import { AppQuery } from '../__generated__/AppQuery.graphql';

function fetchQuery(operation: any, variables: any) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export const App = () => (
  <QueryRenderer<AppQuery>
    environment={modernEnvironment}
    query={graphql`
      query AppQuery {
        viewer {
          ...TodoApp_viewer
        }
      }
    `}
    variables={{}}
    render={({ error, props }) => {
      if (props && props.viewer) {
        return <TodoApp viewer={props.viewer} />;
      } else if (props || error) {
        console.error(`Unexpected data: ${props || error}`);
      } else {
        return <div>Loading</div>;
      }
    }}
  />
);
