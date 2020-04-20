import arc from '@architect/functions';
import { github } from '../../common/github';

const login = async request => {
  if (request.query.code) {
    const account = await github(request);

    return {
      session: { account },
      location: '/admin',
    };
  } else {
    return {
      location: '/?authorized=false',
    };
  }
};

export const handler = arc.http.async(login);
