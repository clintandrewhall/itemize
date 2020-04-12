import arc from '@architect/functions';

const logout = async () => ({
  session: {},
  location: '/',
});

exports.handler = arc.http.async(logout);
