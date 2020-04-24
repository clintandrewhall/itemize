import arc from '@architect/functions';
import { isAuth, getGithubAuthUrl } from '../../common/auth';

const html = `
<!doctype html>
<html>
<body>
<a href=${getGithubAuthUrl()}>Sign in with GitHub</a>
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
