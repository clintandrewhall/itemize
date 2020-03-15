import tiny from 'tiny-json-http';

export const isAuth = req => {
  return req.session && req.session.account;
};

export const getAuthUrl = () => {
  let client_id = process.env.GITHUB_CLIENT_ID;
  let redirect_uri = process.env.GITHUB_REDIRECT;
  let base = 'https://github.com/login/oauth/authorize';
  return `${base}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
};

export const middleware = req => {
  if (!isAuth(req)) {
    return {
      location: '/'
    };
  }
};

export const github = async request => {
  const {
    GITHUB_CLIENT_ID: client_id,
    GITHUB_CLIENT_SECRET: client_secret,
    GITHUB_REDIRECT: redirect_uri
  } = process.env;

  const { code } = request.query;

  // trade the code for an access token
  const result = await tiny.post({
    url: 'https://github.com/login/oauth/access_token',
    headers: { Accept: 'application/json' },
    data: {
      code,
      client_id,
      client_secret,
      redirect_uri
    }
  });

  const token = result.body.access_token;

  // use the access token to get the user account
  const user = await tiny.get({
    url: `https://api.github.com/user?access_token=${token}`,
    headers: { Accept: 'application/json' }
  });

  // create a clean acccount obj
  const { name, login, id, url, avatar_url } = user.body;
  return {
    token,
    name,
    login,
    id,
    url,
    avatar_url
  };
};
