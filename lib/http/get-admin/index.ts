import arc from '@architect/functions';
import { middleware } from '../../common/auth';

const http = async req => ({
  html: `
<!doctype html>
<html>
<body>
<p><a href="/graphql">GraphQL Console</a></p>
<form method=post action=/logout>
  <button>Logout</button>
</form>
<pre>${JSON.stringify(req.session.account, null, 2)}</pre>
</body>
</html>`,
});

export const handler = arc.http.async(middleware, http);
