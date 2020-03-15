import arc from '@architect/functions';

const logout = async () => {
  return {
    session: {},
    location: '/'
  };
};

exports.handler = arc.http.async(logout);
