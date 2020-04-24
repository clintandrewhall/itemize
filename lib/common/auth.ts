export const isAuth = req => req.session && req.session.account;

export const getGithubAuthUrl = () => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_REDIRECT;
  const base = 'https://github.com/login/oauth/authorize';
  return `${base}?client_id=${clientId}&redirect_uri=${redirectUri}`;
};

export const middleware = req => {
  if (!isAuth(req)) {
    return {
      location: '/login',
    };
  }
};
