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
      location: '/',
    };
  }
};
