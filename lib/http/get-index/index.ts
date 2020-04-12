import arc from '@architect/functions';
import { isAuth, getAuthUrl } from '../../common/auth';

const html = `
<!doctype html>
<html>
<body>
<a href=${getAuthUrl()}>Sign in with GitHub</a>
</body>
</html>`;

async function http(req) {
  if (isAuth(req)) {
    return {
      location: '/admin',
    };
  }

  return {
    html,
  };
}

export const handler = arc.http.async(http);
