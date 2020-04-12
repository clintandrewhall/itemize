import tiny from 'tiny-json-http';

export const github = async request => {
  const {
    GITHUB_CLIENT_ID: clientId,
    GITHUB_CLIENT_SECRET: clientSecret,
    GITHUB_REDIRECT: redirectUri,
  } = process.env;

  const { code } = request.query;

  // trade the code for an access token
  const result = await tiny.post({
    url: 'https://github.com/login/oauth/access_token',
    headers: { Accept: 'application/json' },
    data: {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    },
  });

  const token = result.body.access_token;

  // use the access token to get the user account
  const user = await tiny.get({
    url: `https://api.github.com/user?access_token=${token}`,
    headers: { Accept: 'application/json' },
  });

  // create a clean acccount obj
  const { name, login, id, url, avatar_url } = user.body;
  return {
    token,
    name,
    login,
    id,
    url,
    avatar_url,
  };
};
