import arc from '@architect/functions';
import { middleware } from '@architect/shared/auth';

const http = req => ({
  headers: { 'content-type': 'text/html; charset=utf8' },
  body: `
<!DOCTYPE html>
<html>

<head>
  <meta charset=utf-8 />
  <meta name=viewport content=user-scalable=no,initial-scale=1,minimum-scale=1,maximum-scale=1,minimal-ui />
  <title>GraphQL Playground</title>
  <link rel=stylesheet href=//cdn.jsdelivr.net/npm/graphql-playground-react/build/static/css/index.css />
  <link rel="shortcut icon" href=//cdn.jsdelivr.net/npm/graphql-playground-react/build/favicon.png />
  <script src=//cdn.jsdelivr.net/npm/graphql-playground-react/build/static/js/middleware.js></script>
</head>

<body>
  <div id=root>
    <style>
      body {
        background-color: rgb(23, 42, 58);
        font-family: Open Sans, sans-serif;
        height: 90vh;
      }

      #root {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }


      .loading {
        font-size: 32px;
        font-weight: 200;
        color: rgba(255, 255, 255, .6);
        margin-left: 20px;
      }

      img {
        width: 78px;
        height: 78px;
      }

      .title {
        font-weight: 400;
      }
    </style>
    <img src=//cdn.jsdelivr.net/npm/graphql-playground-react/build/logo.png>
    <div class=loading> Loading
      <span class=title>GraphQL Playground</span>
    </div>
  </div>
  <script>
    window.addEventListener('load', function main(event) {
      GraphQLPlayground.init(document.getElementById('root'), {
        endpoint: '/graphql',
        settings: {
          'request.credentials': 'include'
        }
      })
    })
  </script>
</body>

</html>
`
});

export const handler = arc.http.async(middleware, http);
